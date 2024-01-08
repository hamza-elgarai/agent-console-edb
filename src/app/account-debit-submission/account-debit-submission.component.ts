import { Component } from '@angular/core';
import { ClientService } from '../services/client/client.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api/api.service';
import clientData from '../clients';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-debit-submission',
  templateUrl: './account-debit-submission.component.html',
  styleUrls: ['./account-debit-submission.component.css'],
})
export class AccountDebitSubmissionComponent {
    showCard = false;
    benificiaryExists: string = 'yes';
    disableTextFields: boolean = true;
    disableDropDownChooseBenificiary: boolean = false;
    typedOTP:string = ""

    isDropdownOpen: boolean = false;
    client:any;

  ClientData: any;
  Beneficiaries: any;

  toast(message: string, state: string) {
    if (state === 'success') {
      this.toastr.success(message, 'Success', {
        timeOut: 2000,
        progressBar: true,
      });
    } else if (state === 'error') {
      this.toastr.error(message, 'Error', {
        timeOut: 2000,
        progressBar: true,
      });
    }
  }

  clientId!: number;

  authenticationClientId: number = 1;

  // * data for the transaction
  montant: number = 0;
  whoPayFees: string = '';
  benefId: number = 0;
  benefName: string = '';
  transactionType: string = 'GAB';

  generateOTP!: string;

  newBenificiary: any = {
    nom: '',
    prenom: '',
    email: '',
    phone: '',
  };
  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router:Router
  ) {}

  ngOnInit(){

    
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  
  // * update benefId when the user selects a beneficiary from the dropdown
  selectBenificiary(benificiary: any) {
    console.log('selected benificiary', benificiary);
    this.benefId = benificiary.id;
    this.benefName = benificiary.nom + ' ' + benificiary.prenom;

    console.log('who ' + this.whoPayFees);
    this.toggleDropdown();
  }

  // * update whoPayFees when the user selects an option from the dropdown
  changeWhoPayFees(event: any) {
    this.whoPayFees = event.target.value;
    console.log('who ' + this.whoPayFees);
  }

  // * create a new benificiary
  addNewBenificiary() {
    console.log('new benificiary', this.newBenificiary);
    this.apiService
      .createBeneficiary(this.newBenificiary, this.authenticationClientId)
      .subscribe(
        (data:any) => {
          console.log('benficiary Created successfully', data);
          this.Beneficiaries.push(data);
          this.benefId = data.id;
          this.toast('benficiary Created successfully', 'success');
        },
        (error:any) => {
          console.log('error creating benficiary', error);
          this.toast('error creating benficiary', 'error');
        }
      );
  }
  sendOTPToClient() {
    this.apiService.sendOTP(this.ClientData.id).subscribe(
      (data:any) => {
        console.log('OTP sent successfully', data);
        this.generateOTP = data;
        this.toast('OTP sent successfully', 'success');
      },
      (error:any) => {
        console.log('error sending OTP', error);
        this.toast('error sending OTP', 'error');
      }
    );
  }
  cin:string = ""
  handleSearchClient(){
    this.apiService.getClientCIN(this.cin).subscribe((response:any)=>{
      console.log(response);
      if(response){
        this.ClientData = response
        this.apiService.getBeneficiaries(response.id).subscribe(
          (response:any) => {
            console.log('im getting the beneficiaries', response);
            this.Beneficiaries = response;
          },
          (error:any) => {
            console.log('error getting beneficiaries', error);
          }
        );
        this.toggleCard()
      }else{
        this.toastr.warning("Pas de client trouvé par ce CIN")
      }
    })

  }

    toggleVisibilityOfTextFields() {
      if (this.benificiaryExists === 'yes') {
        this.disableTextFields = true; // Disable the text field if "Yes" is selected
        this.disableDropDownChooseBenificiary = false;
      } else if (this.benificiaryExists === 'no') {
        this.disableTextFields = false; // Enable the text field if "No" is selected
        this.disableDropDownChooseBenificiary = true;
      }
    }

    showModal = false;
    toggleModal() {
      this.showModal = !this.showModal;
    }

    toggleCard() {
      this.showCard = !this.showCard;
    }

    

    


  //* submit the transaction
  confirmTransaction() {
    const data = {
      donorId: this.ClientData.id,
      beneficiaryId: this.benefId,
      amount: this.montant,
      whoPayFees: this.whoPayFees,
      paymentType: this.transactionType,
      otpValue: this.typedOTP,
      fraisTransfert: 2,
      notify: true,
      isNotificationFees: true,
    };
    console.log('transaction data', data);

    this.apiService.submitTransaction(data).subscribe(
      (response:any) => {
        if((response.message==="Success")){
          this.toast('transaction submitted successfully', 'success');
          this.router.navigateByUrl("/")

        }else{
          this.toastr.warning(response.message)
        }
  
      },
      (error:any) => {
        console.log('error submitting transaction', error);
        this.toast('error submitting transaction', 'error');
      }
    );
  }

 
}


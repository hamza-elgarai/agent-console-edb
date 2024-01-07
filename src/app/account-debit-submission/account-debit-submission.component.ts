import { Component } from '@angular/core';
import clientData from '../clients';
import { ClientService } from '../services/client/client.service';

@Component({
  selector: 'app-account-debit-submission',
  templateUrl: './account-debit-submission.component.html',
  styleUrls: ['./account-debit-submission.component.css'],
})
export class AccountDebitSubmissionComponent {
    showCard = false;
    cin=''
    benificiaryExists: string = 'yes';
    disableTextFields: boolean = true;
    disableDropDownChooseBenificiary: boolean = false;

    isDropdownOpen: boolean = false;
    client:any;

    constructor(private clientService:ClientService){}
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
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
      console.log('la cin saisie est '+this.cin);
      this.clientService.getClientByCIN(this.cin).subscribe({
        next: (data: any) => {
          console.log('client is ', data);
          this.client=data
          this.client.dateNaissance=this.client.dateNaissance.substring(0,10)
          this.client.expirationPieceIdentite=this.client.expirationPieceIdentite.substring(0,10)

          this.showCard = !this.showCard;
        },
        error: (error) => {
          console.log('error ', error.message);
        }
      });     
    }

    getClientByCIN() {
      this.clientService.getClientByCIN(this.cin).subscribe({
        next: (data: any) => {
          console.log('client is ', data);
        },
        error: (error) => {
          console.log('error ', error.message);
        }
      });
    }

    

}

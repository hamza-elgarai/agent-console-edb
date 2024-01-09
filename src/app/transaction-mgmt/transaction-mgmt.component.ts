import { Component } from '@angular/core';
import { ClientService } from '../services/client/client.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-transaction-mgmt',
  templateUrl: './transaction-mgmt.component.html',
  styleUrls: ['./transaction-mgmt.component.css'],
})
export class TransactionMgmtComponent {
  showCard = false;
  constructor(private clientService:ClientService,private toastr:ToastrService,private router:Router){}

  transRef=""
  benificiaryExists: string = 'yes';
  disableTextFields: boolean = true;
  disableDropDownChooseBenificiary: boolean = false;

  isDropdownOpen: boolean = false;

  otpCode:string = ""

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  transactionStatus:any = {
    "TO_BE_SERVED":"Non servie", "REVERSED" : "Extournée", "PAID":"Payée" , "REFUNDED":"Restituée" , "BLOCKED":"Bloquée"
  }
  // paymentType = wallet : afficher walletId de donneur d'ordre
  transaction:any = {}
  //   "message": "Success",
  //   "transactionId": "TXN000001",
  //   "transaction": {
  //       "id": 1,
  //       "transactionReference": "TXN000001",
  //       "status": "REVERSED",
  //       "paymentType": "WALLET",
  //       "amount": 946.0,
  //       "issueDate": "2024-01-07T14:05:16.799+00:00",
  //       "expiryDate": "2024-01-07T14:05:16.799+00:00",
  //       "donorId": 1,
  //       "beneficiaryId": 1,
  //       "agentId": 1,
  //       "fraisTransfert": 3.7143288060998714,
  //       "whoPayFees": "Beneficiary",
  //       "clientResponse": {
  //           "id": 1,
  //           "title": "ELGARAI",
  //           "prenom": "Hamza",
  //           "typePieceIdentite": "CIN",
  //           "paysEmissionPieceIdentite": "Maroc",
  //           "numeroPieceIdentite": "EE930320",
  //           "expirationPieceIdentite": "2025-12-31T23:00:00.000+00:00",
  //           "dateNaissance": "2001-10-24T00:00:00.000+00:00",
  //           "profession": "Etudiant",
  //           "paysNationalite": "Marocain",
  //           "paysAdresse": "Marrakech, Maroc",
  //           "adresseLegale": "ADRAR 2 MHAMID MARRAKECH",
  //           "ville": "Marrakech",
  //           "gsm": "0634348550",
  //           "email": "hamzaelgarai10@gmail.com",
  //           "agentResponse": {
  //               "id": 1,
  //               "nom": "Atlas",
  //               "prenom": "Abdelghafour",
  //               "email": "atlas@gmail.com",
  //               "phone": "0600225588",
  //               "solde": 5000.0
  //           },
  //           "solde": null,
  //           "beneficiaires": null
  //       },
  //       "beneficiaryResponse": {
  //           "id": 1,
  //           "nom": "ELGARAI",
  //           "prenom": "Karim",
  //           "email": "karimeg@yahoo.fr",
  //           "phone": "0632579630",
  //           "isBlockListed": false,
  //           "walletCode": "hxxx23",
  //           "walletClient": null
  //       },
  //       "notificationFees": true,
  //       "refundReason": null
  //   },
  //   "generatedOTP": null
  // }


  toggleVisibilityOfTextFields() {
    if (this.benificiaryExists === 'yes') {
      this.disableTextFields = true; // Disable the text field if "Yes" is selected
      this.disableDropDownChooseBenificiary = false;
    } else if (this.benificiaryExists === 'no') {
      this.disableTextFields = false; // Enable the text field if "No" is selected
      this.disableDropDownChooseBenificiary = true;
    }
  }
  action:string = ""

  motive:string = ""

  showModal = false;
  toggleModal(action:string) {
    this.action = action
    this.showModal = !this.showModal;
  }
  closeModal(){
    this.showModal = false;
  }

  toggleCard() {
    console.log('toggleCard');
    this.clientService.getTransaction(this.transRef).subscribe((data:any)=>{
      console.log(data);
      if(data.transaction){
        this.transaction = data
        this.showCard = true;
      }else{
        this.toastr.warning("La transaction n'est pas trouvée","",{timeOut:2000})
        this.showCard = false;
      }
    })


  }

  sendOtp(){
    const t = this.transaction.transaction
    if(t && t.donorId){
      this.clientService.sendOTP(t.donorId).subscribe((response:any)=>{
        console.log(response);
        this.toastr.success("Message OTP Envoyé","",{
          timeOut:2000
        })
      })
    }
  }
  confirmOperation(){
    const t = this.transaction
    if(this.action==='restituer'){
      if(t && t.transaction && t.transaction.donorId){
        const request = {
          donorId : t.transaction.donorId,
          beneficiaryId : t.transaction.beneficiaryId,
          agentId : t.transaction.agentId,
          transactionReference : t.transaction.transactionReference,
          otpValue:this.otpCode
        }
        this.clientService.confirmRestitution(request).subscribe((response:any)=>{
          console.log(response);
          if(response.message==="Success"){
            this.toastr.success("Opération complète","",{
              timeOut: 2000
            })
            this.router.navigateByUrl('/clients')
          }
          else{
            this.toastr.warning(response.message,"",{
              timeOut: 2000
            })
          }
        })
      }
    }
    if(this.action==='servir'){
      console.log(this.transaction.transactionId);
      const t = this.transaction
      this.clientService.servirTransaction(t.transactionId,this.otpCode).subscribe((response:any)=>{
        console.log(response);
          if(response.message==="Success"){
            this.toastr.success("Transaction servie","",{
              timeOut: 2000
            })
            this.router.navigateByUrl('/clients')
          }
          else{
            this.toastr.warning(response.message,"",{
              timeOut: 2000
            })
          }
      })
    }
    if(this.action === 'extourner'){
      let request:any = {
        referenceCode:this.transaction.transactionId,
        motive:this.motive,
        agentId:1
      }
      this.clientService.extournerTransaction(request).subscribe((response:any)=>{
        console.log(response);
          if(response.message==="Success"){
            this.toastr.success("Transaction extournée","",{
              timeOut: 2000
            })
            this.router.navigateByUrl('/clients')
          }
          else{
            this.toastr.warning(response.message,"",{
              timeOut: 2000
            })
          }
      })
    }
    
  }


  generatePDF() {
    const doc = new jsPDF();

    // Add your image
    doc.addImage('https://res.cloudinary.com/dhlbxtl5w/image/upload/v1704745101/tylzdsn5lkpn2d1n78ow.png', 5, 5, 40, 20);

    // Set font and text style
    
    doc.setFont('Sans-serif', 'bold');
    // Set font and text style with a red background
    doc.setFillColor(0, 0, 0);
    doc.rect(5, 30, 200, 7, 'F');
    doc.setFillColor(250, 0, 0);
    doc.rect(5, 37, 200, 3, 'F');
    // Title
    doc.setFontSize(22);
    doc.text('Reçu de Paiement', 70,60);

    doc.setFont('Sans-serif', 'bold');
    doc.setFontSize(12);
    doc.text(`Nom du donneur :  ${this.transaction.transaction.clientResponse.prenom} ${this.transaction.transaction.clientResponse.title}` ,15,80);

    doc.setFont('Sans-serif', 'bold');
    doc.setFontSize(12);
    doc.text(`Statut :  ${this.transactionStatus[this.transaction.transaction.status]}` ,15,90);

    doc.setFont('Sans-serif','bold');
    doc.setFontSize(12);
    doc.text(`Nom du bénéficiaire:  ${this.transaction.transaction.beneficiaryResponse.prenom} ${this.transaction.transaction.beneficiaryResponse.nom}` ,15,100);

    doc.setFont('Sans-serif', 'bold');
    doc.setFontSize(12);
    doc.text(`Montant : ${this.transaction.transaction.amount} DH` ,120,90);

    doc.setFont('Sans-serif', 'bold');
    doc.setFontSize(12);
    doc.text(`Frais du transfert : ${this.transaction.transaction.fraisTransfert.toFixed(2)} DH` ,120,100);
    doc.setFont('Sans-serif', 'bold');
    doc.setFont('Sans-serif', 'bold');
    doc.setFontSize(12);
    doc.text(`Référence  :  ${this.transaction.transactionId}` ,120,80);

    doc.setFont('Time', 'normal');
    doc.setFontSize(10);
    doc.setFillColor(250, 0, 0);
    doc.rect(5, 145, 200, 2, 'F');
    doc.text(`le site internet www.edb.co.ma est édité par EDB Transfer National ,Société Anonyme à Conseil d'administration;RC:N 203 Casablanca` ,7,152);
    doc.text(` Siège social : 187 ,Avenue Hassan II 20.010 Casablanca Maroc .` ,7,158);
    doc.save('transaction-receipt.pdf');
  }

}

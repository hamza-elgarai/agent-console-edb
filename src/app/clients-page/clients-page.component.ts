import { Component } from '@angular/core';
import clientData from "../clients"
import { ClientService } from '../services/client/client.service';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.css']
})
export class ClientsPageComponent {
  constructor(private clientService:ClientService){

  }
    ngOnInit(){
      this.getClients();

    }
  clients:any[] = clientData
  renderedClients = this.clients
  searchTerm=""
  
  selectedClients:any[] = []
  isSelectAllChecked = false;
  handleSearch(){
    this.clients = this.clients.map(c=>{c.selected=false;return c})
    this.renderedClients = this.clients.filter((c)=>{
      let valuesString = JSON.stringify(Object.values(c))
      return (valuesString.toLowerCase().includes(this.searchTerm.toLowerCase()))
    })
  }
  handleClickOnRadio(event:Event){
    event.stopPropagation()
  }
  selectAll(event:Event){
    if(this.isSelectAllChecked){
      this.clients = this.clients.map(c => {c.selected = false;return c})
    }
    else{
      this.clients = this.clients.map(c => {c.selected = true;return c})
    }
    this.isSelectAllChecked = !this.isSelectAllChecked

  }
  handleSelectRow(){
    console.log((this.clients.find(c=>!c.selected))?false:true)
    this.isSelectAllChecked= (this.clients.find(c=>!c.selected))?false:true
    
  }

        labels:any = {
          id:"Identifiant",
          title:"Nom",
          prenom:"Prénom",
          typePieceIdentite:"Type de pièce d'identité",
          paysEmissionPieceIdentite:"Pays d'émission de pièce d'identité",
          numeroPieceIdentite:"Numéro de pièce d'identité",
          expirationPieceIdentite:"Date d'expiration de la pièce d'identité",
          dateNaissance:"Date de naissance",
          profession:"Profession",
          paysNationalite:"Pays de nationalité",
          paysAdresse:"Addresse Pays",
          adresseLegale:"Adresse legale",
          ville:"Ville",
          gsm:"Tél",
          email:"E-mail",
          agent:"Agent",
          beneficiaires:"Bénéficiaires"
        }
        client:any = {
          id:null,
          title:"",
          prenom:"",
          typePieceIdentite:"",
          paysEmissionPieceIdentite:"",
          numeroPieceIdentite:"",
          expirationPieceIdentite: "",
          dateNaissance: "",
          profession:"",
          paysNationalite:"",
          paysAdresse:"",
          adresseLegale:"",
          ville:"",
          gsm:"",
          email:"",
          agent:null,
          beneficiaires:[
          ]
      }
      getObjectKeys(obj: any): string[] {
        return Object.keys(obj);
      }

      modalClass="modal-bg"
      openModal(event:Event){
        this.modalClass = "modal-bg modal-opened"
      }
      closeModal(event:Event){
        this.modalClass = "modal-bg"
      }
      stopPropagation(event:Event){
        event.stopPropagation()
      }
      getClients() {
        this.clientService.getClients().subscribe({
          next: (data: any) => {
            console.log('clients are ', data);
          },
          error: (error) => {
            console.log('error ', error.message);
          }
        });
      }
}

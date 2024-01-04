import { Component } from '@angular/core';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent {
  newBen = {fname:"",lname:"",email:"",tel:""}
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
    id:1,
    title:"ELGARAI",
    prenom:"Hamza",
    typePieceIdentite:"CIN",
    paysEmissionPieceIdentite:"Maroc",
    numeroPieceIdentite:"EE930320",
    expirationPieceIdentite: "2025-12-31",
    dateNaissance: "2001-10-24",
    profession:"Etudiant",
    paysNationalite:"Marocain",
    paysAdresse:"Marrakech, Maroc",
    adresseLegale:"ADRAR 2 MHAMID MARRAKECH",
    ville:"Marrakech",
    gsm:"0634348550",
    email:"hamzaelgarai10@gmail.com",
    agent:null,
    beneficiaires:[
      {fname:"Mohamed",lname:"Hamdani",email:"hamdanimee@gmail.com",tel:"0634206920"},
      {fname:"Reda",lname:"Himmi",email:"himmireda@gmail.com",tel:"0632036203"},
      {fname:"Ahmed",lname:"Iraoui",email:"irahmed@gmail.com",tel:"0698752035"},
    ]
 }
 getObjectKeys(obj: any): string[] {
  return Object.keys(obj);
}
updateObject(key: string, value: any): void {
  this.client[key] = value;
}
addBen(){
  this.client.beneficiaires.push(this.newBen)
  this.newBen = {fname:"",lname:"",email:"",tel:""}
}
remBen(ben:any){
  this.client.beneficiaires = this.client.beneficiaires.filter((b:any)=>b.email !==ben.email)

}
}

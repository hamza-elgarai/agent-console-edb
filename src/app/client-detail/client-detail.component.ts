import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../services/client/client.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent {
  constructor(private route: ActivatedRoute,private datePipe:DatePipe,private router:Router, private clientService: ClientService) { }
  client:any
  id:string | null=''
  ngOnInit(): void {
    // Get the parameter from the route
     this.id = this.route.snapshot.paramMap.get('id');

    // Fetch data based on the parameter
    this.clientService.getClientById(this.id).subscribe((result) => {
      this.client = result;
      this.client.expirationPieceIdentite=this.datePipe.transform(new Date(this.client.expirationPieceIdentite.substring(0,10)),'yyyy-MM-dd');
      this.client.dateNaissance= this.datePipe.transform(new Date(this.client.dateNaissance.substring(0,10)),'yyyy-MM-dd');

    });
  }

  updateClient(){
  //  const id = this.route.snapshot.paramMap.get('id');

    this.clientService.updateClient(this.client,this.id).subscribe((result) => {
      this.router.navigateByUrl('/clients')

    });
  }
  deleteClient(){
    this.clientService.deleteClient(this.id).subscribe((result) => {
      this.router.navigateByUrl('/clients')

    });
  }

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
  }
//   client:any = {
//     id:1,
//     title:"ELGARAI",
//     prenom:"Hamza",
//     typePieceIdentite:"CIN",
//     paysEmissionPieceIdentite:"Maroc",
//     numeroPieceIdentite:"EE930320",
//     expirationPieceIdentite: "2025-12-31",
//     dateNaissance: "2001-10-24",
//     profession:"Etudiant",
//     paysNationalite:"Marocain",
//     paysAdresse:"Marrakech, Maroc",
//     adresseLegale:"ADRAR 2 MHAMID MARRAKECH",
//     ville:"Marrakech",
//     gsm:"0634348550",
//     email:"hamzaelgarai10@gmail.com",
//     agent:null,
//     beneficiaires:[
//       {fname:"Mohamed",lname:"Hamdani",email:"hamdanimee@gmail.com",tel:"0634206920"},
//       {fname:"Reda",lname:"Himmi",email:"himmireda@gmail.com",tel:"0632036203"},
//       {fname:"Ahmed",lname:"Iraoui",email:"irahmed@gmail.com",tel:"0698752035"},
//     ]
//  }
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

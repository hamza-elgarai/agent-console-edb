import { Component } from '@angular/core';
import clientData from "../clients"

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.css']
})
export class ClientsPageComponent {

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

}

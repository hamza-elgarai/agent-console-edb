import { Component } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';
import { TokenStorageService } from '../services/auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edb-header',
  templateUrl: './edb-header.component.html',
  styleUrls: ['./edb-header.component.css']
})
export class EdbHeaderComponent {
  isMenuOpen=false
  showDropdown=false
  

  constructor(private router:Router,private authService: AuthenticationService,private tokenService: TokenStorageService){}
  isAuthenticated=this.authService.isAuthenticated()

  logout(){
    this.authService.logout();
    // clear local storage
    this.tokenService.clear();
    console.log('succesfully logged out')
    this.router.navigateByUrl('/')


  }
  toggleDropdown(){}
  
}

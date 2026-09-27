import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth-service';

@Component({
  imports: [],
  selector: 'app-auth-component',
  styleUrl: './auth-component.css',
  templateUrl: './auth-component.html',
})
export class AuthComponent {

constructor(private _auth:AuthService) {
  
}



signIn() {
  this._auth.login();
}
signOut() {

  this._auth.logout();
}
}

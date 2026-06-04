import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  username ='';
  password ='';
  errorMessage='';
  showLogin = false; 


  toggleLogin() {
    this.showLogin = !this.showLogin; 
  }
  
  
  login(){
    if(this.username === 'admin123'  && this.password === '1234') {
      alert('login successfully as admin');
    }
    else if(this.username === 'user123'  && this.password === '1234') {
      alert('login successfully as user');
    }
    
    else if(this.username === '')
    {
      alert('input something!');
    }
       else if(this.password === '')
    {
      alert('input something!');
      
    }
    else {
      alert('login failed');
    }
  }  

}
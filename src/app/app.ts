import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
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
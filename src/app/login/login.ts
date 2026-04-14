import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  username = '';
  password = '';
  confirmPassword = '';

  showLogin = false;
  showSignUp = false;

  users: { email: string; password: string }[] = [];

  currentView: 'home' | 'admin' | 'user' = 'home';

  // Toggle Login Sidebar
  toggleLogin() {
    this.showLogin = !this.showLogin;
    this.showSignUp = false; // close signup if open
  }

  // Toggle Signup Sidebar
  toggleSignUp() {
    this.showSignUp = !this.showSignUp;
    this.showLogin = false; // close login if open
  }

  // LOGIN FUNCTION
  login() {
    if (!this.username || !this.password) {
      alert('Please fill in all fields');
      return;
    }

    if (this.username === 'admin123' && this.password === '1234') {
      this.currentView = 'admin';
      this.resetFields();
    }
    else if (this.username === 'user123' && this.password === '1234') {
      this.currentView = 'user';
      this.resetFields();
    }
    else {
      alert('Invalid credentials');
    }
  }

  // REGISTER FUNCTION
 register() {
  if (!this.username || !this.password || !this.confirmPassword) {
    alert('Please fill in all fields');
    return;
  }

  if (this.password !== this.confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  // ✅ Save user
  this.users.push({
    email: this.username,
    password: this.password
  });

  alert('Registration successful!');

  this.resetFields();
}

  // LOGOUT
  logout() {
    this.currentView = 'home';
    this.showLogin = false;
    this.showSignUp = false;
    this.resetFields();
  }

  // CLEAR INPUTS
  resetFields() {
    this.username = '';
    this.password = '';
    this.confirmPassword = '';
  }
}
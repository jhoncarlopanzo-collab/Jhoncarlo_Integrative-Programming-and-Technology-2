import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { routes } from '../app.routes';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private fb = inject(FormBuilder);

  isSignUpMode = false;

  loginForm: FormGroup;

  users: any[] = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
private router = inject(Router);
  constructor() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
    
  }

  
  toggleSignUp() {
    this.isSignUpMode = !this.isSignUpMode;
  }

  
  register() {
    const { username, password, confirmPassword, email } = this.loginForm.value;

    
    if (this.loginForm.invalid) {
  this.loginForm.markAllAsTouched(); // show all errors
  return;
}

if (password !== confirmPassword) {
  alert('Passwords do not match');
  return;
}

    const newUser = { username, password, email };

    this.users.push(newUser);

    localStorage.setItem('registeredUsers', JSON.stringify(this.users));

    alert('User Registered!');

    this.loginForm.reset();
    this.isSignUpMode = false;
  }

  
  login() {
    const { username, password } = this.loginForm.value;

    if (username === 'admin' && password === 'admin123') {
      alert('Admin Login');
      this.router.navigate(['/dashboard']);
      return;
    }

    const userExists = this.users.find(
      u => u.username === username && u.password === password
    );

    if (userExists) {
      alert(`Welcome, ${username}!`);
    } else {
      alert('Invalid username or password.');
    }
  }

  // 🗑 CLEAR USERS
  clearTable() {
    if (confirm('Are you sure?')) {
      localStorage.removeItem('registeredUsers');
      this.users = [];
    }
  }
}
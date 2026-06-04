import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

const USERS_STORAGE_KEY = 'panzo-users';
const SESSION_STORAGE_KEY = 'panzo-session';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  constructor(private router: Router) {}

  username = '';
  password = '';
  confirmPassword = '';

  showLogin = false;
  showSignUp = false;

  users: { email: string; password: string }[] = [];

  currentView: 'home' | 'admin' | 'user' = 'home';

  ngOnInit() {
    this.loadUsers();
    this.loadSession();
  }

  private loadUsers() {
    const savedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    this.users = savedUsers ? JSON.parse(savedUsers) : [];
  }

  private loadSession() {
    const savedSession = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!savedSession) {
      return;
    }

    try {
      const session = JSON.parse(savedSession) as { role?: 'admin' | 'user' };
      if (session.role === 'admin' || session.role === 'user') {
        this.currentView = session.role;
        this.router.navigate(['/dashboard']);
      }
    } catch {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }

  private saveUsers() {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(this.users));
  }

  private saveSession(role: 'admin' | 'user') {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ email: this.username.trim().toLowerCase(), role }));
  }

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

    const email = this.username.trim().toLowerCase();
    const savedUser = this.users.find((user) => user.email.toLowerCase() === email && user.password === this.password);

    if (this.username === 'admin123' && this.password === '1234') {
      this.currentView = 'admin';
      this.saveSession('admin');
      this.resetFields();
      this.showLogin = false;
      this.router.navigate(['/dashboard']);
      alert('Welcome admin!');
      return;
    }

    if (savedUser) {
      this.currentView = 'user';
      this.saveSession('user');
      this.resetFields();
      this.showLogin = false;
      this.router.navigate(['/dashboard']);
      alert('Login successful!');
      return;
    }

    alert('Invalid credentials');
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

    const email = this.username.trim().toLowerCase();
    const alreadyExists = this.users.some((user) => user.email.toLowerCase() === email);

    if (alreadyExists) {
      alert('An account with this email already exists. Please log in instead.');
      return;
    }

    this.users.push({
      email,
      password: this.password,
    });

    this.saveUsers();
    this.showSignUp = false;
    alert('Registration successful! Please log in with your new account.');
    this.resetFields();
  }

  // LOGOUT
  logout() {
    this.currentView = 'home';
    this.showLogin = false;
    this.showSignUp = false;
    localStorage.removeItem(SESSION_STORAGE_KEY);
    this.resetFields();
    this.router.navigate(['/login']);
  }

  // CLEAR INPUTS
  resetFields() {
    this.username = '';
    this.password = '';
    this.confirmPassword = '';
  }
}
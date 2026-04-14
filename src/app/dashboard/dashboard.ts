import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  constructor(private router: Router) {}

  currentView: string = 'admin';
  logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
  }
  goToPortfolio() { 
    this.router.navigate(['/portfolio']);
  }

}

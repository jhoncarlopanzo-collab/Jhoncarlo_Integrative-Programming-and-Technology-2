import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  userLabel = 'Guest';
  roleLabel = 'Hotel staff';

  stats = [
    { label: 'Occupied Rooms', value: '84', detail: '+6% vs yesterday' },
    { label: 'Check-ins Today', value: '27', detail: '3 VIP arrivals' },
    { label: 'Revenue', value: '$18.4k', detail: 'Target reached' },
  ];

  tasks = [
    'Prepare afternoon tea for the rooftop lounge',
    'Confirm housekeeping for 12 deluxe rooms',
    'Review spa bookings for the weekend',
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const savedSession = localStorage.getItem('panzo-session');
    if (!savedSession) {
      this.router.navigate(['/login']);
      return;
    }

    const session = JSON.parse(savedSession) as { email?: string; role?: 'admin' | 'user' };
    this.userLabel = session.email?.split('@')[0] || 'Hotel Manager';
    this.roleLabel = session.role === 'admin' ? 'Admin dashboard' : 'Guest dashboard';
  }

  logout(): void {
    localStorage.removeItem('panzo-session');
    this.router.navigate(['/login']);
  }
}

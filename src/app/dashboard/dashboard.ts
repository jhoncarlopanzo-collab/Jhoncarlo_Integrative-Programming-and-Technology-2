import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { HotelService, Hotel } from '../services/hotel';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {
  private router = inject(Router);
  private hotelService = inject(HotelService);

  public displayedHotels: Hotel[] = [];
  public searchTerm: string = '';
  public currentPage: number = 1;
  public itemsPerPage: number = 3;
  public currentView: string = 'admin';

  private searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;

  ngOnInit() {
    this.displayedHotels = this.hotelService.getAll();
    
    console.log('Dashboard Initialized');
    console.log('Total Hotels Available:', this.displayedHotels.length);
  

    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(300),
      map((term: string) => term.trim().toLowerCase()),
      distinctUntilChanged()
    ).subscribe({
      next: (term: string) => {
        this.displayedHotels = this.hotelService.searchHotels(term);
        this.currentPage = 1;
        
        console.log('=== SEARCH RESULTS ===');
        console.log('Search Term:', term || 'No filter (showing all)');
        console.log('Hotels Found:', this.displayedHotels.length);
        console.log('====================');
      }
    });
  }

  onSearchChange(value: string): void {
    this.searchSubject.next(value);
  }
  goToPortfolio() {
    this.router.navigate(['/portfolio']);
  }
  get totalPages(): number {
    return this.hotelService.calculateTotalPages(
      this.displayedHotels.length,
      this.itemsPerPage
    );
  }

  get paginatedHotels(): Hotel[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.displayedHotels.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      console.log(`📄 Current Page: ${this.currentPage} / ${this.totalPages}`);
      console.log('Displayed Hotels:', this.paginatedHotels);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      console.log(`📄 Current Page: ${this.currentPage} / ${this.totalPages}`);
      console.log('Displayed Hotels:', this.paginatedHotels);
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }
}

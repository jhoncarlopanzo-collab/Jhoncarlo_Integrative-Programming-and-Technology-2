import { Injectable } from '@angular/core';

export interface Hotel {
  id: number;
  name: string;
  location: string;
  rating: number;
  pricePerNight: number;
}

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private hotelsList: Hotel[] = [
    { id: 1, name: 'Grand Plaza Hotel', location: 'Downtown', rating: 4.5, pricePerNight: 150 },
    { id: 2, name: 'Sunset Beach Resort', location: 'Beach Side', rating: 4.8, pricePerNight: 200 },
    { id: 3, name: 'Mountain View Inn', location: 'Mountains', rating: 4.2, pricePerNight: 100 },
    { id: 4, name: 'City Center Hotel', location: 'City Center', rating: 4.6, pricePerNight: 180 },
    { id: 5, name: 'Luxury Palace', location: 'Premium District', rating: 4.9, pricePerNight: 300 },
  ];

  getAll(): Hotel[] {
    return [...this.hotelsList];
  }

  searchHotels(term: string): Hotel[] {
    if (!term) return this.getAll();
    const lowerTerm = term.toLowerCase();
    return this.hotelsList.filter(h =>
      h.name.toLowerCase().includes(lowerTerm) ||
      h.location.toLowerCase().includes(lowerTerm)
    );
  }

  calculateTotalPages(totalItems: number, itemsPerPage: number): number {
    return Math.ceil(totalItems / itemsPerPage);
  }
}

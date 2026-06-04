import { Routes } from '@angular/router';
import { Portfolio } from './portfolio/portfolio'; // Adjust path if needed
import { Login } from './login/login';

export const routes: Routes = [
  { path: '', component: Login }, // Default route
  { path: 'portfolio', component: Portfolio },
  // Add other routes here
];
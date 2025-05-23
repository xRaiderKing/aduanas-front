import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Navbar -->
    <nav class="bg-white shadow-lg fixed w-full top-0 z-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <a routerLink="/" class="flex items-center">
              <img src="assets/logo.svg" alt="Aduanas Logo" class="h-8 w-auto">
            </a>
          </div>

          <!-- Centered Navigation Links -->
          <div class="flex-1 flex justify-center">
            <div class="flex space-x-8">
              <a routerLink="/" 
                 routerLinkActive="text-indigo-600" 
                 [routerLinkActiveOptions]="{exact: true}"
                 class="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Inicio
              </a>
              <a routerLink="/clientes" 
                 routerLinkActive="text-indigo-600" 
                 class="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Clientes
              </a>
              <a href="#servicios" 
                 class="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Servicios
              </a>
              <a href="#contacto" 
                 class="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Contacto
              </a>
            </div>
          </div>

          <!-- Login Button -->
          <div class="flex-shrink-0">
            <a routerLink="/login" 
               class="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out inline-block">
              Login
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Spacer for fixed navbar -->
    <div class="h-16"></div>

    <!-- Main Content -->
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }
    main {
      margin-top: 4rem;
    }
  `]
})
export class AppComponent {
  title = 'aduanas-landing';
}

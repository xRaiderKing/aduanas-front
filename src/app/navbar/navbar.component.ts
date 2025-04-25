import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-white shadow-lg fixed w-full top-0 z-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <a routerLink="/" class="text-xl font-bold text-gray-800">Aduanas</a>
          </div>

          <!-- Centered Navigation Links -->
          <div class="hidden md:flex flex-1 justify-center">
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
              <a routerLink="/servicios" 
                 routerLinkActive="text-indigo-600" 
                 class="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Servicios
              </a>
              <a routerLink="/contacto" 
                 routerLinkActive="text-indigo-600" 
                 class="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Contacto
              </a>
            </div>
          </div>

          <!-- Login Button -->
          <div class="flex-shrink-0">
            <button class="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
    <!-- Spacer to prevent content from being hidden under the fixed navbar -->
    <div class="h-16"></div>
  `
})
export class NavbarComponent {} 
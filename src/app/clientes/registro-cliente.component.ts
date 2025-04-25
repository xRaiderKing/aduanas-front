import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from '../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md mx-auto">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Registro de Cliente</h2>

          <!-- Success Alert -->
          <div *ngIf="showSuccessAlert" class="success-alert bg-green-500 text-white p-4 mb-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium">Cliente registrado satisfactoriamente</p>
              </div>
              <div class="ml-auto pl-3">
                <div class="-mx-1.5 -my-1.5">
                  <button (click)="showSuccessAlert = false" class="inline-flex rounded-md p-1.5 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-500 focus:ring-white">
                    <span class="sr-only">Cerrar</span>
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <form [formGroup]="clienteForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div>
              <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
              <input type="text" id="nombre" formControlName="nombre"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <div *ngIf="clienteForm.get('nombre')?.invalid && clienteForm.get('nombre')?.touched"
                   class="mt-1 text-sm text-red-600">
                El nombre es requerido
              </div>
            </div>

            <div>
              <label for="apellido" class="block text-sm font-medium text-gray-700">Apellido</label>
              <input type="text" id="apellido" formControlName="apellido"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <div *ngIf="clienteForm.get('apellido')?.invalid && clienteForm.get('apellido')?.touched"
                   class="mt-1 text-sm text-red-600">
                El apellido es requerido
              </div>
            </div>

            <div>
              <label for="correoElectronico" class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
              <input type="email" id="correoElectronico" formControlName="correoElectronico"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <div *ngIf="clienteForm.get('correoElectronico')?.invalid && clienteForm.get('correoElectronico')?.touched"
                   class="mt-1 text-sm text-red-600">
                <div *ngIf="clienteForm.get('correoElectronico')?.errors?.['required']">
                  El correo electrónico es requerido
                </div>
                <div *ngIf="clienteForm.get('correoElectronico')?.errors?.['email']">
                  Ingrese un correo electrónico válido
                </div>
              </div>
            </div>

            <div>
              <label for="telefono" class="block text-sm font-medium text-gray-700">Teléfono</label>
              <input type="tel" id="telefono" formControlName="telefono"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <div *ngIf="clienteForm.get('telefono')?.invalid && clienteForm.get('telefono')?.touched"
                   class="mt-1 text-sm text-red-600">
                <div *ngIf="clienteForm.get('telefono')?.errors?.['required']">
                  El teléfono es requerido
                </div>
                <div *ngIf="clienteForm.get('telefono')?.errors?.['pattern']">
                  El teléfono debe contener exactamente 10 dígitos
                </div>
              </div>
            </div>

            <div>
              <label for="direccion" class="block text-sm font-medium text-gray-700">Dirección</label>
              <input type="text" id="direccion" formControlName="direccion"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <div *ngIf="clienteForm.get('direccion')?.invalid && clienteForm.get('direccion')?.touched"
                   class="mt-1 text-sm text-red-600">
                La dirección es requerida
              </div>
            </div>

            <div>
              <button type="submit" [disabled]="clienteForm.invalid"
                      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                Registrar Cliente
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class RegistroClienteComponent implements OnInit {
  clienteForm: FormGroup;
  showSuccessAlert = false;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router
  ) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      direccion: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.clienteForm.valid) {
      this.clienteService.registrarCliente(this.clienteForm.value).subscribe({
        next: (response) => {
          this.showSuccessAlert = true;
          setTimeout(() => {
            this.router.navigate(['/clientes']);
          }, 2000);
        },
        error: (error) => {
          console.error('Error al registrar cliente:', error);
        }
      });
    }
  }
} 
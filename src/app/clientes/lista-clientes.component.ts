import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClienteService, Cliente } from '../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-clientes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <!-- Header -->
          <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">Lista de Clientes</h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">Información detallada de todos los clientes registrados</p>
            </div>
            <a routerLink="/register-cliente" 
               class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Nuevo Cliente
            </a>
          </div>

          <!-- Loading State -->
          <div *ngIf="isLoading" class="flex justify-center items-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>

          <!-- Error Message -->
          <div *ngIf="error" class="bg-red-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">{{ error }}</h3>
              </div>
            </div>
          </div>

          <!-- Success Alert -->
          <div *ngIf="showSuccessAlert" class="fixed top-20 left-4 z-50">
            <div class="success-alert bg-green-500 text-white p-4">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium">Cliente eliminado satisfactoriamente</p>
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
          </div>

          <!-- Table -->
          <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                        <th scope="col" class="relative px-6 py-3">
                          <span class="sr-only">Acciones</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr *ngFor="let cliente of clientes">
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm font-medium text-gray-900">{{ cliente.nombre }} {{ cliente.apellido }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm text-gray-900">{{ cliente.correoElectronico }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm text-gray-900">{{ cliente.telefono || 'No especificado' }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm text-gray-900">{{ cliente.direccion || 'No especificada' }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button (click)="editarCliente(cliente.correoElectronico)" 
                                  class="text-indigo-600 hover:text-indigo-900 mr-4">
                            Editar
                          </button>
                          <button (click)="abrirModalConfirmacion(cliente.correoElectronico)" 
                                  class="text-red-600 hover:text-red-900">
                            Eliminar
                          </button>
                        </td>
                      </tr>
                      <!-- Empty State -->
                      <tr *ngIf="clientes.length === 0 && !isLoading">
                        <td colspan="5" class="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                          No hay clientes registrados
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div class="flex-1 flex justify-between sm:hidden">
              <button (click)="cambiarPagina(currentPage - 1)" 
                      [disabled]="currentPage === 0"
                      class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
                Anterior
              </button>
              <button (click)="cambiarPagina(currentPage + 1)"
                      [disabled]="!hasNextPage"
                      class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
                Siguiente
              </button>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Mostrando <span class="font-medium">{{ clientes.length ? currentPage * pageSize + 1 : 0 }}</span> a
                  <span class="font-medium">{{ Math.min((currentPage + 1) * pageSize, totalElements) }}</span> de
                  <span class="font-medium">{{ totalElements }}</span> resultados
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button (click)="cambiarPagina(currentPage - 1)"
                          [disabled]="currentPage === 0"
                          class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                    <span class="sr-only">Anterior</span>
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  <button (click)="cambiarPagina(currentPage + 1)"
                          [disabled]="!hasNextPage"
                          class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                    <span class="sr-only">Siguiente</span>
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmación -->
    <div *ngIf="showModal" class="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Confirmar eliminación
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    ¿Está seguro de que desea eliminar este cliente? Esta acción no se puede deshacer.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" (click)="confirmarEliminacion()"
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
              Eliminar
            </button>
            <button type="button" (click)="cerrarModal()"
                    class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ListaClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  currentPage = 0;
  pageSize = 5;
  totalElements = 0;
  isLoading = false;
  error: string | null = null;
  hasNextPage = false;
  Math = Math;
  showModal = false;
  showSuccessAlert = false;
  clienteAEliminar: string | null = null;

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.isLoading = true;
    this.error = null;
    
    this.clienteService.listarClientes(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.clientes = response.content;
        this.totalElements = response.totalElements;
        this.hasNextPage = this.currentPage < (Math.ceil(this.totalElements / this.pageSize) - 1);
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los clientes. Por favor, intente nuevamente.';
        this.isLoading = false;
        console.error('Error:', error);
      }
    });
  }

  cambiarPagina(newPage: number) {
    if (newPage >= 0 && (this.hasNextPage || newPage < this.currentPage)) {
      this.currentPage = newPage;
      this.cargarClientes();
    }
  }

  editarCliente(correoElectronico: string) {
    this.router.navigate(['/clientes/editar', correoElectronico]);
  }

  abrirModalConfirmacion(correoElectronico: string) {
    this.clienteAEliminar = correoElectronico;
    this.showModal = true;
  }

  cerrarModal() {
    this.showModal = false;
    this.clienteAEliminar = null;
  }

  confirmarEliminacion() {
    if (this.clienteAEliminar) {
      this.clienteService.eliminarCliente(this.clienteAEliminar).subscribe({
        next: () => {
          this.showModal = false;
          this.clienteAEliminar = null;
          this.showSuccessAlert = true;
          setTimeout(() => {
            this.showSuccessAlert = false;
          }, 3000);
          this.cargarClientes();
        },
        error: (error) => {
          this.error = 'Error al eliminar el cliente. Por favor, intente nuevamente.';
          console.error('Error:', error);
        }
      });
    }
  }
} 
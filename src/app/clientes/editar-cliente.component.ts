import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService, Cliente } from '../services/cliente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-cliente.component.html'
})
export class EditarClienteComponent implements OnInit {
  clienteForm: FormGroup;
  cliente: Cliente | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private fb: FormBuilder
  ) {
    this.clienteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      correoElectronico: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      direccion: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit() {
    const correoElectronico = this.route.snapshot.paramMap.get('correoElectronico');
    if (correoElectronico) {
      this.cargarCliente(correoElectronico);
    } else {
      this.error = 'No se proporcionó un correo electrónico válido';
      this.isLoading = false;
    }
  }

  cargarCliente(correoElectronico: string) {
    this.clienteService.obtenerCliente(correoElectronico).subscribe({
      next: (cliente: Cliente) => {
        this.cliente = cliente;
        this.clienteForm.patchValue(cliente);
        this.isLoading = false;
      },
      error: (err: Error) => {
        this.error = 'Error al cargar los datos del cliente';
        this.isLoading = false;
        console.error('Error al cargar cliente:', err);
      }
    });
  }

  onSubmit() {
    if (this.clienteForm.valid && this.cliente) {
      const clienteActualizado: Cliente = {
        ...this.cliente,
        ...this.clienteForm.value
      };

      this.isLoading = true;
      this.clienteService.actualizarCliente(this.cliente.correoElectronico, clienteActualizado).subscribe({
        next: () => {
          this.router.navigate(['/clientes']);
        },
        error: (err: Error) => {
          this.error = 'Error al actualizar el cliente';
          this.isLoading = false;
          console.error('Error al actualizar cliente:', err);
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/clientes']);
  }
} 
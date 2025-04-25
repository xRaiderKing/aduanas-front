import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClienteService, Cliente } from '../services/cliente.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-cliente',
  templateUrl: './register-cliente.component.html',
  styleUrls: ['./register-cliente.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class RegisterClienteComponent implements OnInit {
  clienteForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router
  ) {
    this.clienteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      apellido: ['', [Validators.required, Validators.maxLength(100)]],
      correoElectronico: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      telefono: ['', [Validators.maxLength(15)]],
      direccion: ['', [Validators.maxLength(400)]]
    });
  }

  ngOnInit(): void {
    // Resetear mensajes cuando el componente se inicializa
    this.errorMessage = '';
    this.successMessage = '';
  }

  onSubmit() {
    if (this.clienteForm.valid) {
      this.isLoading = true;
      const cliente: Cliente = this.clienteForm.value;
      
      this.clienteService.crearCliente(cliente).subscribe({
        next: (response) => {
          this.successMessage = 'Cliente registrado exitosamente';
          this.errorMessage = '';
          this.clienteForm.reset();
          this.isLoading = false;
          
          // Esperar 2 segundos antes de redirigir
          setTimeout(() => {
            this.router.navigate(['/clientes']);
          }, 2000);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Error al registrar el cliente';
          this.successMessage = '';
          this.isLoading = false;
        }
      });
    } else {
      // Marcar todos los campos como touched para mostrar los errores
      Object.keys(this.clienteForm.controls).forEach(key => {
        const control = this.clienteForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  // Método para verificar si un campo es inválido
  isFieldInvalid(field: string): boolean {
    const control = this.clienteForm.get(field);
    return control ? control.invalid && control.touched : false;
  }

  // Método para obtener el mensaje de error de un campo
  getErrorMessage(field: string): string {
    const control = this.clienteForm.get(field);
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (control?.hasError('email')) {
      return 'El formato del correo electrónico no es válido';
    }
    if (control?.hasError('maxlength')) {
      return `No puede exceder ${control.errors?.['maxlength'].requiredLength} caracteres`;
    }
    return '';
  }
} 
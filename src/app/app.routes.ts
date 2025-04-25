import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterClienteComponent } from './register-cliente/register-cliente.component';
import { ListaClientesComponent } from './clientes/lista-clientes.component';
import { EditarClienteComponent } from './clientes/editar-cliente.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'register-cliente', component: RegisterClienteComponent },
  { path: 'clientes', component: ListaClientesComponent },
  { path: 'clientes/editar/:correoElectronico', component: EditarClienteComponent },
  { path: '**', redirectTo: '/clientes' } // Redirige cualquier ruta no encontrada a la página de clientes
];

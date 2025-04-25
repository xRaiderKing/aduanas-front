import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Cliente {
  nombre: string;
  apellido: string;
  correoElectronico: string;
  telefono?: string;
  direccion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = `${environment.apiUrl}/clientes`;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('Error:', error.error.message);
    } else {
      // Error del lado del servidor
      console.error(`Código de error: ${error.status}, ` + `mensaje: ${error.error}`);
    }
    return throwError(() => new Error('Algo salió mal; por favor intente de nuevo más tarde.'));
  }

  crearCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente)
      .pipe(catchError(this.handleError));
  }

  obtenerCliente(correoElectronico: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${correoElectronico}`)
      .pipe(catchError(this.handleError));
  }

  actualizarCliente(correoElectronico: string, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${correoElectronico}`, cliente)
      .pipe(catchError(this.handleError));
  }

  eliminarCliente(correoElectronico: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${correoElectronico}`)
      .pipe(catchError(this.handleError));
  }

  listarClientes(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&size=${size}`)
      .pipe(catchError(this.handleError));
  }
} 
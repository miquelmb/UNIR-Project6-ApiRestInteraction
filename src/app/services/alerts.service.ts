import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  async showDeleteConfirm(): Promise<boolean> {
    const result = await Swal.fire({
      title: 'Estás seguro/a?',
      text: 'El usuario será permanentemente eliminado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#365A5E',
      cancelButtonColor: '#b6263e',
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'Cancelar',
    });
    return result.isConfirmed;
  }

  showError(title: string, message: string): void {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonText: 'Volver atrás',
      confirmButtonColor: '#365A5E',
    });
  }

  showSuccess(message: string): void {
    Swal.fire({
      text: message,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#365A5E',
    });
  }
}

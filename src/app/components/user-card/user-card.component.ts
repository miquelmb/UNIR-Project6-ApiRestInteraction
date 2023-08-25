import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AlertsService } from 'src/app/services/alerts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent {
  @Input() oneUser: Usuario | any;
  router = inject(Router);
  usersService = inject(UsersService);
  alertsService = inject(AlertsService);

  async deleteUser(user: string) {
    const confirmed = await this.alertsService.showDeleteConfirm();
    if (!confirmed) {
      return;
    }
    try {
      const response = await this.usersService.delete(user);
      if (response.error) {
        this.alertsService.showError('Error', response.error);
      } else {
        this.alertsService.showSuccess('Usuario eliminado correctamente!');
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
}

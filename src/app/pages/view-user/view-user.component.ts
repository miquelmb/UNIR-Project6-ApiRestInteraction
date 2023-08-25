import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AlertsService } from 'src/app/services/alerts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
})
export class ViewUserComponent {
  activatedRoute = inject(ActivatedRoute);
  usersService = inject(UsersService);
  alertsService = inject(AlertsService);
  oneUser!: Usuario | any;
  router = inject(Router);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let _id: string = params.iduser;
      this.oneUser = await this.usersService.getByAlfaId(_id);
    });
  }

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

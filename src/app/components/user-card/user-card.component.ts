import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
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

  async deleteUser(user: string) {
    if (confirm('Vas a borrar este usuario/a. Estás seguro/a?') === true) {
      try {
        const response = await this.usersService.delete(user);

        if (response.error) {
          alert('Error: ' + '' + response.error);
        } else {
          this.router.navigate(['/home']);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  }
}

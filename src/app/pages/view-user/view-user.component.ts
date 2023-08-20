import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
})
export class ViewUserComponent {
  activatedRoute = inject(ActivatedRoute);
  usersService = inject(UsersService);
  unUsuario!: Usuario | any;
  router = inject(Router);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let _id: string = params.iduser;
      this.unUsuario = await this.usersService.getByAlfaId(_id);
    });
  }

  async deleteUser(user: string) {
    if (confirm('Vas a borrar este usuario/a. Estás seguro/a?') === true) {
      let response = await this.usersService.delete(user);
      this.router.navigate(['/home']);
    }
  }
}

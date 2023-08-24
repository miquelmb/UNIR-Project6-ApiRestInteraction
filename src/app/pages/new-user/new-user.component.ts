import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent {
  formTitle: string = 'NUEVO USUARIO';
  buttonText: string = 'Guardar';

  userForm: FormGroup;

  activatedRoute = inject(ActivatedRoute);
  usersService = inject(UsersService);
  router = inject(Router);

  constructor() {
    this.userForm = new FormGroup(
      {
        first_name: new FormControl('', []),
        last_name: new FormControl('', []),
        email: new FormControl('', []),
        image: new FormControl('', []),
      },
      []
    );
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let _id: string = params.iduser;
      let response;
      if (_id !== undefined) {
        this.formTitle = 'ACTUALIZAR USUARIO';
        this.buttonText = 'Actualizar';
        response = await this.usersService.getByAlfaId(_id);
        this.userForm = new FormGroup(
          {
            _id: new FormControl(response._id, []),
            first_name: new FormControl(response.first_name, []),
            last_name: new FormControl(response.last_name, []),
            email: new FormControl(response.email, []),
            image: new FormControl(response.image, []),
          },
          []
        );
      }
    });
  }

  async getUserDataForm(): Promise<void> {
    if (this.userForm.value._id) {
      let response = await this.usersService.update(this.userForm.value);
      if (response.id) {
        alert('Usuario/a actualizado/a correctamente');
        this.router.navigate(['/home']);
      } else {
        alert(`El usuario no ha podido ser actualizado. ${response.error}`);
      }
    } else {
      let response = await this.usersService.insert(this.userForm.value);
      if (response.id) {
        alert('Usuario/a añadido/a correctamente');
        this.router.navigate(['/home']);
      } else {
        alert('Error al añadir usuario/a');
      }
    }
  }
}

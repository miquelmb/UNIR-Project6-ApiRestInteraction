import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetApi } from 'src/app/interfaces/get-api.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';

import { AlertsService } from 'src/app/services/alerts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent {
  formTitle: string = 'NUEVO USUARIO/A';
  buttonText: string = 'Guardar';
  mailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  urlRegEx =
    /^(http(s)?|ftp):\/\/[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

  userForm: FormGroup;

  getApiInfo!: GetApi;
  arrUsers!: Usuario[];

  activatedRoute = inject(ActivatedRoute);
  usersService = inject(UsersService);
  alertsService = inject(AlertsService);
  router = inject(Router);

  constructor() {
    this.userForm = new FormGroup(
      {
        first_name: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        last_name: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(this.mailRegEx),
          this.emailValidacion,
        ]),
        image: new FormControl('', [
          Validators.required,
          Validators.pattern(this.urlRegEx),
        ]),
      },
      []
    );
  }

  ngOnInit(): void {
    // Obtener datos de los usuarios y asignar a arrUsers para hacer validación de email ya existente.
    this.usersService.getAll(1).then((response) => {
      this.arrUsers = response.results;
    });

    this.activatedRoute.params.subscribe(async (params: any) => {
      let _id: string = params.iduser;
      let response;
      if (_id !== undefined) {
        this.formTitle = 'ACTUALIZAR USUARIO/A';
        this.buttonText = 'Actualizar';
        response = await this.usersService.getByAlfaId(_id);
        this.userForm = new FormGroup(
          {
            _id: new FormControl(response._id, []),
            first_name: new FormControl(response.first_name, [
              Validators.required,
              Validators.minLength(2),
            ]),
            last_name: new FormControl(response.last_name, [
              Validators.required,
              Validators.minLength(2),
            ]),
            email: new FormControl(response.email, [
              Validators.required,
              Validators.pattern(this.mailRegEx),
            ]),
            image: new FormControl(response.image, [
              Validators.required,
              Validators.pattern(this.urlRegEx),
            ]),
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
        this.alertsService.showSuccess('Usuario/a actualizado/a correctamente');
        // Navegamos a vista detalle para ver los cambios realizados
        this.router.navigate(['/user', this.userForm.value._id]);
      } else {
        this.alertsService.showError(
          'El usuario no ha podido ser actualizado',
          `${response.error}`
        );
      }
    } else {
      let response = await this.usersService.insert(this.userForm.value);
      if (response.id) {
        this.alertsService.showSuccess('Usuario/a añadido/a correctamente');
        this.router.navigate(['/home']);
      } else {
        this.alertsService.showError(
          'El usuario no ha podido ser actualizado',
          `${response.error}`
        );
      }
    }
  }

  checkControl(
    formControlName: string,
    validator: string
  ): boolean | undefined {
    return (
      this.userForm.get(formControlName)?.hasError(validator) &&
      this.userForm.get(formControlName)?.touched
    );
  }

  emailValidacion = (formValue: AbstractControl): any => {
    const email = formValue.value;

    // If para que no busque en el servicio hasta que el formato de email sea el correcto.
    if (this.mailRegEx.test(email)) {
      const emailExists = this.arrUsers.some((user) => user.email === email);

      if (emailExists) {
        return {
          emailvalidacion: `Este email ya existe en nuestra base de datos`,
        };
      } else {
        return null;
      }
    }
  };
}

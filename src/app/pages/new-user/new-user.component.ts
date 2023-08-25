import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertsService } from 'src/app/services/alerts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent {
  formTitle: string = 'NUEVO USUARIO';
  buttonText: string = 'Guardar';
  mailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  urlRegEx =
    /^(http(s)?|ftp):\/\/[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

  userForm: FormGroup;

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
        this.router.navigate(['/home']);
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
}

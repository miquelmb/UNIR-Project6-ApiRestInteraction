import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { lastValueFrom } from 'rxjs';
import { GetApi } from '../interfaces/get-api.interface';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  httpClient = inject(HttpClient);
  apiMainUrl = 'https://peticiones.online/api/users';

  constructor() {}

  getAll(page: number): Promise<GetApi> {
    return lastValueFrom(
      this.httpClient.get<GetApi>(`${this.apiMainUrl}?page=${page}`)
    );
  }

  getByAlfaId(_id: string): Promise<Usuario> {
    return lastValueFrom(
      this.httpClient.get<Usuario>(`${this.apiMainUrl}/${_id}`)
    );
  }

  delete(_id: string): Promise<any> {
    return lastValueFrom(
      this.httpClient.delete<any>(`${this.apiMainUrl}/${_id}`)
    );
  }

  update(formValue: Usuario): Promise<Usuario> {
    return lastValueFrom(
      this.httpClient.put<Usuario>(
        `${this.apiMainUrl}/${formValue._id}`,
        formValue
      )
    );
  }

  insert(formValue: Usuario): Promise<Usuario> {
    return lastValueFrom(
      this.httpClient.post<Usuario>(this.apiMainUrl, formValue)
    );
  }
}

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
  apiMainUrl = 'https://peticiones.online/api/users/';

  constructor() {}

  getAll(): Promise<GetApi> {
    return lastValueFrom(this.httpClient.get<GetApi>(this.apiMainUrl));
  }

  getByAlfaId(id: string): Promise<Usuario> {
    return lastValueFrom(
      this.httpClient.get<Usuario>(`${this.apiMainUrl}${id}`)
    );
  }

  delete(id: string): Promise<any> {
    return lastValueFrom(
      this.httpClient.delete<any>(`${this.apiMainUrl}${id}`)
    );
  }
}

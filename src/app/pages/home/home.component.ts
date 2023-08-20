import { Component, inject } from '@angular/core';
import { GetApi } from 'src/app/interfaces/get-api.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  getApiInfo: GetApi;
  arrUsers!: Usuario[];
  usersService = inject(UsersService);

  constructor() {
    this.getApiInfo = {
      page: 0,
      per_page: 0,
      total: 0,
      total_pages: 0,
      results: [],
    };
  }

  async ngOnInit(): Promise<void> {
    try {
      this.getApiInfo = await this.usersService.getAll();
      this.arrUsers = this.getApiInfo.results;
    } catch (error) {
      console.log(error);
    }
  }
}

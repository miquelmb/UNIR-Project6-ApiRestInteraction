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
  currentPage = 1;
  arrayOfPages: number[] = [];
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

  ngOnInit(): void {
    this.fetchData(this.currentPage);
  }

  async fetchData(page: number): Promise<void> {
    try {
      this.getApiInfo = await this.usersService.getAll(page);
      this.arrUsers = this.getApiInfo.results;
      if (this.arrayOfPages.length === 0) {
        this.arrayOfPagesMaker(this.getApiInfo.total_pages);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Crear un array con el numero de cada página de todas las páginas de usuarios que haya en la API.
  arrayOfPagesMaker(max: number): void {
    for (let i = 1; i <= max; i++) {
      this.arrayOfPages.push(i);
    }
  }

  async changePage(page: number): Promise<void> {
    this.currentPage = page;
    await this.fetchData(page);
  }

  async addOrSubtractPage(page: string): Promise<void> {
    if (page === '+' && this.currentPage < this.arrayOfPages.length) {
      await this.fetchData(this.currentPage + 1);
      this.currentPage++;
    }
    if (page === '-' && this.currentPage > this.arrayOfPages[0]) {
      await this.fetchData(this.currentPage - 1);
      this.currentPage--;
    }
  }
}

import { Usuario } from './usuario.interface';

export interface GetApi {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  results: Usuario[];
}

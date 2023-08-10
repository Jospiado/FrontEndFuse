import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item.model';

const baseUrl = 'http://localhost:8080/api/itens';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  createImage(id: any, data: any): Observable<any> {
    return this.http.post(`${baseUrl}/${id}`, data);
  }

  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(baseUrl);
  }

  get(id: any): Observable<Item> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  getPage(page: any,limit: any): Observable<Item[]> {
    return this.http.get<Item[]>(`${baseUrl}/paginacao?page=${page}&limit=${limit}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByDescricao(descricao: any,page: any, limit: any): Observable<Item[]> {
    return this.http.get<Item[]>(`${baseUrl}?descricao=${descricao}&page=${page}&limit=${limit}`);
  }
  findByFornecedor(parceiro: any): Observable<Item[]> {
    return this.http.get<Item[]>(`${baseUrl}?marca=${parceiro}`);
  }
}

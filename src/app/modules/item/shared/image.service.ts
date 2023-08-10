import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  upload(data: any, id: any): Observable<any> {
    return this.http.post(`${baseUrl}/${id}`, data);
  }

  getById(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/imagens/${id}`);
  }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }
}

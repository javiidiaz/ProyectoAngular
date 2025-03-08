import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CocheService {

  private apiUrl = 'http://localhost:8000/coches';

  constructor(private http: HttpClient) { }

  // Método para obtener todos los coches
  getCoches(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Método para obtener un coche por ID
  getCoche(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Método para crear un coche
  addCoche(coche: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, coche);
  }

  // Método para actualizar un coche
  updateCoche(id: number, coche: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, coche);
  }

  // Método para eliminar un coche
  deleteCoche(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

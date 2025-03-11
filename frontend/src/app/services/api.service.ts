import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://apiproyecto016.iesruizgijon.es/api/articulos';

  constructor(private http: HttpClient) {}

  // Obtener todos los artículos
  getArticulos(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.articulos) // Extraemos solo los artículos
    );
  }

  // Crear un nuevo artículo
  createArticulo(articulo: any): Observable<any> {
    const body = new HttpParams().set('json', JSON.stringify(articulo));

    return this.http.post(this.apiUrl, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }

  // Actualizar un artículo
  updateArticulo(id: number, articulo: any): Observable<any> {
    const body = new HttpParams().set('json', JSON.stringify(articulo));

    return this.http.put(`${this.apiUrl}/${id}`, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }

  // Eliminar un artículo
  deleteArticulo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

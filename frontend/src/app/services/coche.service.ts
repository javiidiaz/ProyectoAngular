import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Coche {
  id: number;
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  imagen: string;
}

@Injectable({
  providedIn: 'root',
})
export class CochesService {
  private apiUrl = 'http://localhost:8000/coches'; // URL de la API Laravel

  constructor(private http: HttpClient) {}

  // Método para obtener los coches
  obtenerCoches(filtros: any = {}): Observable<Coche[]> {
    let params = new HttpParams();

    // Agregar filtros a los parámetros de la solicitud
    Object.keys(filtros).forEach((key) => {
      if (filtros[key]) {
        params = params.set(key, filtros[key]);
      }
    });

    return this.http.get<Coche[]>(this.apiUrl, { params });
  }
}

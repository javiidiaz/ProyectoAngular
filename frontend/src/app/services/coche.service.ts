import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz Coche
export interface Coche {
  id: number;
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  imagen: string;
}

@Injectable({
  providedIn: 'root'
})
export class CochesService {

  private apiUrl = 'http://localhost:8000/coches';

  constructor(private http: HttpClient) { }

  // Método para obtener los coches
  // Observable<Coche[]> es una promesa, que devuelve un array de Coche, se utiliza para funciones asincronas
  obtenerCoches(filtros: any = {}): Observable<Coche[]> {
    let params = new HttpParams();

    // Agregar los filtros si existen
    Object.keys(filtros).forEach((key) => {
      if (filtros[key]) {
        params = params.set(key, filtros[key]);
      }
    });

    return this.http.get<Coche[]>(this.apiUrl, { params });
  }

}

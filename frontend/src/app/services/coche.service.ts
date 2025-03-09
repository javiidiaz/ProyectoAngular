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
  providedIn: 'root',
})
export class CochesService {
  private apiUrl = 'http://localhost:8000/coches';

  constructor(private http: HttpClient) {}

  // Método para obtener los coches
  // Observable<Coche[]> es una promesa, que devuelve un array de Coche, se utiliza para funciones asincronas
  obtenerCoches(filtros: any = {}): Observable<Coche[]> {
    let params = new HttpParams();

    // Agregar los filtros si existen
    // Recibe un objeto 'filtros' con las claves como los filtros a aplicar a la solicitud.
    Object.keys(filtros).forEach((key) => {
      // Verifica si el valor del filtro para la clave 'key' no es un valor falso
      if (filtros[key]) {
        // Agrega el filtro como un parámetro a 'params' usando la clave 'key' y el valor correspondiente de 'filtros[key]'.
        params = params.set(key, filtros[key]);
      }
    });

    return this.http.get<Coche[]>(this.apiUrl, { params });
  }
}

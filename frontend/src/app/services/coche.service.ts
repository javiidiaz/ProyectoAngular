import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  private apiUrl = 'http://localhost:8000/coches';
  private csrfToken: string = '';

  constructor(private http: HttpClient) {
    this.obtenerCsrfToken().subscribe(
      (response) => {
        this.csrfToken = response.csrfToken; // Guarda el token CSRF
      },
      (error) => {
        console.error('Error al obtener el token CSRF:', error);
      }
    );
  }

  // Obtener el token CSRF desde Laravel
  private obtenerCsrfToken(): Observable<{ csrfToken: string }> {
    return this.http.get<{ csrfToken: string }>('http://localhost:8000/csrf-token');
  }

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

  // Agregar un coche
  agregarCoche(coche: Coche): Observable<Coche> {
    const headers = new HttpHeaders({
      'X-CSRF-TOKEN': this.csrfToken,
    });
    return this.http.post<Coche>(this.apiUrl, coche, { headers });
  }

  // Editar un coche
  editarCoche(id: number, coche: Coche): Observable<Coche> {
    const headers = new HttpHeaders({
      'X-CSRF-TOKEN': this.csrfToken,
    });
    return this.http.put<Coche>(`${this.apiUrl}/${id}`, coche, { headers });
  }

  // Eliminar un coche
  eliminarCoche(id: number): Observable<void> {
    const headers = new HttpHeaders({
      'X-CSRF-TOKEN': this.csrfToken,
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}




















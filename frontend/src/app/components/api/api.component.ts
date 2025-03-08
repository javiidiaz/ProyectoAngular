import { Component, OnInit } from '@angular/core';
import { CochesService, Coche } from '../../services/coche.service';

@Component({
  selector: 'app-api',
  standalone: false,
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {
  coches: Coche[] = [];
  loading: boolean = true;

  // Variables para los filtros
  marca: string = '';
  modelo: string = '';
  precioMin: number | null = null;
  precioMax: number | null = null;
  anioMin: number | null = null;
  anioMax: number | null = null;

  constructor(private cochesService: CochesService) { }

  ngOnInit(): void {
    this.cargarCoches();
  }

  // Subscribe escucha al observable, cuando la peticion recibe una respuesta, se ejecuta el callback
  // Método para obtener los coches con filtros
  cargarCoches(): void {
    this.loading = true;
    this.cochesService.obtenerCoches({
      marca: this.marca,
      modelo: this.modelo,
      precio_min: this.precioMin,
      precio_max: this.precioMax,
      anio_min: this.anioMin,
      anio_max: this.anioMax
    }).subscribe(
      (data) => {
        this.coches = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error al cargar los coches:', error);
        this.loading = false;
      }
    );
  }
}

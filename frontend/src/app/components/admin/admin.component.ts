import { Component, OnInit } from '@angular/core';
import { CochesService, Coche } from '../../services/coche.service';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  coches: Coche[] = [];
  cocheSeleccionado: Coche = { id: 0, marca: '', modelo: '', anio: 0, precio: 0, imagen: '' };
  loading = true;
  error = '';

  constructor(private cochesService: CochesService) {}

  ngOnInit(): void {
    this.cargarCoches();
  }

  // Método para cargar todos los coches
  cargarCoches(): void {
    this.loading = true;
    this.cochesService.obtenerCoches().subscribe(
      (coches) => {
        this.coches = coches;
        this.loading = false;
      },
      (error) => {
        this.error = 'Error al cargar los coches';
        this.loading = false;
      }
    );
  }

  // Método para agregar un coche
  agregarCoche(coche: Coche): void {
    this.cochesService.agregarCoche(coche).subscribe(
      (nuevoCoche) => {
        this.coches.push(nuevoCoche);
        this.cocheSeleccionado = { id: 0, marca: '', modelo: '', anio: 0, precio: 0, imagen: '' }; // Limpiar el formulario
      },
      (error) => {
        this.error = 'Error al agregar el coche';
      }
    );
  }

  // Método para editar un coche
  editarCoche(): void {
    if (this.cocheSeleccionado.id) {
      this.cochesService.editarCoche(this.cocheSeleccionado.id, this.cocheSeleccionado).subscribe(
        (cocheEditado) => {
          const index = this.coches.findIndex(c => c.id === cocheEditado.id);
          if (index !== -1) {
            this.coches[index] = cocheEditado;
          }
          this.cocheSeleccionado = { id: 0, marca: '', modelo: '', anio: 0, precio: 0, imagen: '' }; // Limpiar el formulario
        },
        (error) => {
          this.error = 'Error al editar el coche';
        }
      );
    }
  }

  // Método para eliminar un coche
  eliminarCoche(id: number): void {
    this.cochesService.eliminarCoche(id).subscribe(
      () => {
        this.coches = this.coches.filter(coche => coche.id !== id);
      },
      (error) => {
        this.error = 'Error al eliminar el coche';
      }
    );
  }
}

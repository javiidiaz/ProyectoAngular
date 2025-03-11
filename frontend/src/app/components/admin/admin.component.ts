import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  articulos: any[] = [];
  articulo = { id: null, descripcion: '', precio: null };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.cargarArticulos();
  }

  cargarArticulos() {
    this.apiService.getArticulos().subscribe(data => {
      this.articulos = data;
    });
  }

  agregarArticulo() {
    if (!this.articulo.descripcion || !this.articulo.precio) {
      alert('Completa todos los campos');
    } else  {
      if (this.articulo.id) {
        // Editar artículo
        this.apiService.updateArticulo(this.articulo.id, this.articulo).subscribe(() => {
          this.cargarArticulos();
          this.resetFormulario();
        });
      } else {
        // Crear artículo
        this.apiService.createArticulo(this.articulo).subscribe(() => {
          this.cargarArticulos();
          this.resetFormulario();
        });
      }
    }

  }

  editarArticulo(articulo: any) {
    this.articulo = {
      id: articulo.id,
      descripcion: articulo.descripcion,
      precio: articulo.precio
    };
  }


  eliminarArticulo(id: number) {
    if (confirm('¿Seguro que quieres eliminar este artículo?')) {
      this.apiService.deleteArticulo(id).subscribe(() => {
        this.cargarArticulos();
      });
    }
  }

  resetFormulario() {
    this.articulo = { id: null, descripcion: '', precio: null };
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { ApiComponent } from './components/api/api.component';
import { AcercadeComponent } from './components/acercade/acercade.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
  { path: '', component: BienvenidaComponent },
  { path: 'api', component: ApiComponent },
  { path: 'acercade', component: AcercadeComponent },
  { path: '**', component: NotfoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

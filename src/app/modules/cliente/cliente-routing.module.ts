import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteFormComponent } from './cliente-form/cliente-form.component'; 
import { ClienteListComponent } from './cliente-list/cliente-list.component'; 


const routes: Routes = [
  { path: '', component: ClienteListComponent}, 
  { path: 'new', component: ClienteFormComponent}, 
  { path: ':id/edit', component: ClienteFormComponent} 

];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class ClienteRoutingModule { }

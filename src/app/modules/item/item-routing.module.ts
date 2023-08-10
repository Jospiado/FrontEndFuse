import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { DetailsItemComponent } from './details-item/details-item.component';
import { DetalhesItemComponent } from './detalhes-item/detalhes-item.component';
import { ListImageComponent } from './list-image/list-image.component';
import { ListItemComponent } from './list-item/list-item.component';
import { WhatsappComponent } from './whatsapp/whatsapp.component';

const routes: Routes = [
  { path: '', component: ListItemComponent}, 
  { path: 'new', component: AddItemComponent}, 
  { path: 'detalhesitem/:id', component: DetalhesItemComponent},
  { path: 'detailsitem/:id', component: DetailsItemComponent},
  { path: 'whatsapp/:id', component: WhatsappComponent}  ,
  { path: 'image/:id', component: ListImageComponent}  

];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class ItemRoutingModule { }
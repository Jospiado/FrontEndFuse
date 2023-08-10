import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 

import { AddItemComponent } from './add-item/add-item.component';
import { ListItemComponent } from './list-item/list-item.component';
import { DetailsItemComponent } from './details-item/details-item.component';

import { ItemRoutingModule } from './item-routing.module';


import { FormsModule } from '@angular/forms'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatMenuModule } from '@angular/material/menu'; 
import { DetalhesItemComponent } from './detalhes-item/detalhes-item.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';
import { FuseDrawerModule } from '@fuse/components/drawer';
import {MatSidenavModule} from '@angular/material/sidenav';
import { WhatsappComponent } from './whatsapp/whatsapp.component';
import { ListImageComponent } from './list-image/list-image.component';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import { DialogCamposComponent } from './dialog-campos/dialog-campos.component'
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [ 
  AddItemComponent, 
  ListItemComponent, 
  DetailsItemComponent,
  DetalhesItemComponent,
  WhatsappComponent,
  ListItemComponent,
  ListImageComponent,
  ImageDialogComponent,
  DialogCamposComponent,
  ],
  imports: [ 
    CommonModule, 
    ItemRoutingModule,
    MatButtonModule,
    MatButtonModule, 
    MatCardModule, 
    MatMenuModule,
    MatIconModule, 
    MatInputModule, 
    FormsModule,
    MatIconModule,
    MatPaginatorModule,
    FuseScrollbarModule,
    FuseDrawerModule,
    MatSidenavModule,
    MatDialogModule,
    MatListModule,
    MatCheckboxModule
  ] 
})

export class ItemModule { }

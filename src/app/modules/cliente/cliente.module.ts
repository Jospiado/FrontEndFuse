import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 

import { ClienteFormComponent } from './cliente-form/cliente-form.component'; 
import { ClienteListComponent } from './cliente-list/cliente-list.component'; 
import { ClienteRoutingModule } from './cliente-routing.module'; 

import { FormsModule } from '@angular/forms'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatMenuModule } from '@angular/material/menu'; 


@NgModule({
  declarations: [ 
  ClienteListComponent, 
  ClienteFormComponent, 
  ],
  imports: [ 
    CommonModule, 
    ClienteRoutingModule,
    MatButtonModule,
    MatButtonModule, 
    MatCardModule, 
    MatMenuModule,
    MatIconModule, 
    MatInputModule, 
    FormsModule 
  ] 
})

export class ClienteModule { }

import { Component, OnInit } from '@angular/core';
import { Cliente } from '../shared/cliente.model';
import { ClienteService } from '../shared/cliente.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  ClienteCollection?: Cliente[];
  currentCliente: Cliente = {};
  debug = true;
  currentIndex!: number;

  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit(): void {
    this.retrieveClientes();
  }

  retrieveClientes(): void {
    this.clienteService.getAll()
      .subscribe(
        data => {
          this.ClienteCollection = data;
          if (this.debug) console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  setActiveCliente(cliente: Cliente): void {
    this.router.navigate(['/cliente', cliente.id, 'edit']); 
  }
}

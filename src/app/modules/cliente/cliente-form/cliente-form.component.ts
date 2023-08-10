import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../shared/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../shared/cliente.model';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

   pageTitle!: string;
  currentAction!: string; 
  debug = true; 
  cliente: Cliente = {  };

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.setCurrentAction(); 
  }

  private setCurrentAction(): void { 
    if (this.route.snapshot.url[0].path == 'new') { 
      this.currentAction = 'new'; 
      this.pageTitle = 'Cadastro de Cliente'; 
    } else { 
      this.currentAction = 'edit'; 
      this.getCliente(this.route.snapshot.params['id']); 
      this.pageTitle = 'Edição de Cliente'; 
    } 
  } 

  getCliente(id: string): void {
    this.clienteService.get(id)
      .subscribe(
        data => {
          this.cliente = data;
          if (this.debug) console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateCliente(): void {

    this.clienteService.update(this.cliente.id, this.cliente)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.router.navigate(['/cliente']);  
        },
        error => {
          console.log(error);
        });
  }

  deleteCliente(): void {
    this.clienteService.delete(this.cliente.id)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.router.navigate(['/cliente']);  
        },
        error => {
          console.log(error);
        });
  }

  submitForm(): void { 
    if (this.currentAction == 'new') { 
      this.createCliente(); 
      console.log('new'); 
    } else { 
      this.updateCliente(); 
      console.log('edit'); 
    } 
  } 

  createCliente(): void { 

    this.clienteService.create(this.cliente) 
      .subscribe( 
        response => { 
          if (this.debug) console.log(response); 
          this.router.navigate(['/cliente']);  
        }, 
        error => { 
          console.log(error); 
        }); 
  } 
}

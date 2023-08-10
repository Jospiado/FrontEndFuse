import { Component, ElementRef, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../shared/item.model';
import { ItemService } from '../shared/item.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-details-item',
  templateUrl: './details-item.component.html',
  styleUrls: ['./details-item.component.css']
})
export class DetailsItemComponent implements OnInit {
  originalItem: any; // Objeto para armazenar o estado original do item

  editMode = false; // Inicialmente o formulário está em modo de visualização

  item: Item = {
    item: '',
    descricao: '',
    barras: '',
    quantidadeEstoque: 0,
    preco: 0,
    precominimo: 0,
    referencia: '',
    marca: '',
    parceiro: '',
  };
  message = '';
  debug = true;


  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router,
    private el: ElementRef) { }

  ngOnInit(): void {
    this.message = '';
    this.getItem(this.route.snapshot.params['id']);
  }

  getItem(id: string): void {
    this.itemService.get(id)
      .subscribe(
        data => {
          this.item = data;
          if (this.debug) console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateItem(): void {
    this.message = '';

    this.itemService.update(this.item.id, this.item)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.message = response.message ? response.message : 'A entidade ItemEditor foi atualizada com sucesso!';
        },
        error => {
          console.log(error);
        });
  }

  deleteItem(): void {
    this.itemService.delete(this.item.id)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.router.navigate(['/item']);
        },
        error => {
          console.log(error);
        });
  }


editForm() {
  if (this.editMode) {
    // Se o formulário já estiver em modo de edição, basta cancelar a edição
    this.cancelEdit();
  } else {
    // Se o formulário estiver em modo de visualização, inicie o modo de edição
    this.editMode = true;
    // Faça uma cópia do objeto original para restaurá-lo se o usuário cancelar a edição
    this.originalItem = Object.assign({}, this.item);
    const formContainer = this.el.nativeElement.querySelector('.form-container');
    formContainer.classList.add('edit-mode');
    formContainer.classList.remove('view-mode');
  }
}


cancelEdit() {
  // Restaure o objeto para o estado original
  Object.assign(this.item, this.originalItem);
  this.editMode = false;
  const formContainer = this.el.nativeElement.querySelector('.form-container');
  formContainer.classList.add('view-mode');
  formContainer.classList.remove('edit-mode');
}

saveEdit() {
  // Aqui você pode adicionar a lógica para salvar as alterações no formulário, se necessário.

  this.message = '';

    this.itemService.update(this.item.id, this.item)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.message = response.message ? response.message : 'A entidade ItemEditor foi atualizada com sucesso!';
          Swal.fire('Sucesso', 'Alterações salvas com sucesso!', 'success');
          
        },
        error => {
          Swal.fire('Erro','Erro ao editar','error');
          console.log(error);
        });

  this.editMode = false;
  const formContainer = this.el.nativeElement.querySelector('.form-container');
  formContainer.classList.add('view-mode');
  formContainer.classList.remove('edit-mode');
}
voltar() {
  // Verifica se há uma rota anterior (voltar para a tela anterior)
  this.router.navigate(['/item'], { queryParams: { view: this.route.snapshot.queryParams['view'] } });
}
}




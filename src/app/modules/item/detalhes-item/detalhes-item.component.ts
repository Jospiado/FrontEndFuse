import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../shared/item.model';
import { ItemService } from '../shared/item.service';

@Component({
  selector: 'app-detalhes-item',
  templateUrl: './detalhes-item.component.html',
  styleUrls: ['./detalhes-item.component.css']
})
export class DetalhesItemComponent implements OnInit {

  item: Item = {
    item: '',
    descricao: '',
    barras: '',
    quantidadeEstoque: 0,
    preco: 0,
    precominimo: 0,
    referencia: '',
    marca: '',

  };
  message = '';
  debug = true;


  constructor(private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router) { }

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

  realizaBuca() {

  }
}

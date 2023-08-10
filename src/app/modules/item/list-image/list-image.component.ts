import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { observable } from 'rxjs';
import { ItemService } from '../shared/item.service';
import { Item } from '../shared/item.model';
import { ImageService } from '../shared/image.service';
@Component({
  selector: 'app-list-image',
  templateUrl: './list-image.component.html',
  styleUrls: ['./list-image.component.css'],
})
export class ListImageComponent implements OnInit {
  imageUrl: any;
  idimgs = '63ae3b65922a4a4ec143f9b2';
  listImage: any[] = [];
  listImageId: any[] = [];
  currentItem: Item = {};
  index=-1;
  item: Item = {
    item: '',
    descricao: '',
    barras: '',
    quantidadeEstoque: 0,
    preco: 0,
    precominimo: 0,
    referencia: '',
    marca: '',
    imagensdoitem: [],
  };
  debug = true;
  message = '';

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private imageService: ImageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getItem(this.route.snapshot.params['id']);
    /*this.imageService.getById(this.route.snapshot.params['id']).subscribe((data: any) => {
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + data.img.data);
    });*/
  }

  getItem(id: string): void {
    this.itemService.get(id).subscribe(
      (data) => {
        this.item = data;
        this.currentItem = data;
        console.log(this.item);
        // this.imageService.getById(id).subscribe((data: any) => {
        //   this.listImage = data;
        //   console.log(this.listImage);
        //   this.imageUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,'+ data.img.data);
        //   this.listImageId.push(this.imageUrl);
        // });

        if (this.debug) console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateItem(id: any, data: any): void {
    this.message = '';

    this.itemService.update(id, data).subscribe(
      (response) => {
        if (this.debug) console.log(response);
        this.message = response.message
          ? response.message
          : 'A entidade ItemEditor foi atualizada com sucesso!';
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent {

  isCardView: boolean = true;
  currentImageIndex: any=0;
  totalImages: any= 5;

openImages() {
throw new Error('Method not implemented.');
}
closeDialog() {
throw new Error('Method not implemented.');
}
openDetails() {
throw new Error('Method not implemented.');
}
shareItem() {
throw new Error('Method not implemented.');
}
  item: any;

  constructor(private dialogRef: MatDialogRef<ImageDialogComponent>,@Inject(MAT_DIALOG_DATA) private data: any,private router: Router,
  private route: ActivatedRoute,private http: HttpClient) {
    this.item = data.item;
    console.log(this.item.id);
    
    this.route.queryParams.subscribe(params => {
      if (params.view === 'list') {
        // Defina a visualização como lista
        this.isCardView = false;
      } else {
        // Visualização padrão é em cards
        this.isCardView = true;
      }
    });
  }


        // Método para navegar para os detalhes do item e preservar o estado atual da página
        navigateToDetails(itemId: number) {
          this.dialogRef.close();
          const currentView = this.isCardView ? 'card' : 'list';
          this.router.navigate([`item/detailsitem/${itemId}`], { queryParams: { view: currentView } });
        }

        navigateToWhatsapp(itemId: number) {
          this.dialogRef.close();
          const currentView = this.isCardView ? 'card' : 'list';
          this.router.navigate([`item/whatsapp/${itemId}`], { queryParams: { view: currentView } });
        }
  
        changeImage(step: number) {
          // Lógica para avançar ou retroceder para a próxima imagem
          this.currentImageIndex = (this.currentImageIndex + step + this.totalImages) % this.totalImages;
        }

        isImageValid(): Promise<boolean> {
          const currentImageUrl = `http://localhost:8080/api/image/imagens/${this.item.id}?index=${this.currentImageIndex}`;
      
          // Faça uma solicitação HEAD para verificar a existência da imagem
          return this.http.head(currentImageUrl, { observe: 'response' })
            .toPromise()
            .then(response => {
              // Verifica se o código de status é 200 (OK) ou 304 (Não Modificado)
              return response.status === 200 || response.status === 304;
            })
            .catch(() => {
              // Em caso de erro na solicitação, a imagem é considerada inválida
              return false;
            });
        }

        
      }

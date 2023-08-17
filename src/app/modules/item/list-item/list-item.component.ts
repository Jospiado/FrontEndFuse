import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Item } from '../shared/item.model';
import { ItemService } from '../shared/item.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from 'app/modules/item/image-dialog/image-dialog.component';
import { DialogCamposComponent } from '../dialog-campos/dialog-campos.component';


@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  isCardView: boolean = true; // Inicialmente definido para o modo de exibição de cartão
  isListView: boolean = false; // Inicialmente definido para o modo de exibição de lista
  isGridView: boolean = false; // Inicialmente definido como falso



  camposExibicao: string[]

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


  camposSelecionados: { [campo: string]: boolean } = {};

  numbers: number[] = [0,1,2,3,4,5,6,7,8,9,10];
  
  pageNumber=0;
  limitNumber= 10;
  estaCarregandoSpinner: boolean = true
  // parceiroSolo:Parceiro={};
  parceiroDesc? = '';

  // parceiroCollection?: Parceiro[];
  // selected = this.parceiroCollection;
  ItemCollection?: Item[];
  // Itens
  // ConfiguracoesCollection?: ConfiguracaoBusca[];
  currentItem: Item = {};
  // currentConfiguracoes: ConfiguracaoBusca = {};
  itemTroca: any=[];


  currentIndex = -1;
  debug = true;
  descricao = '';
  base64Data: any;
  fornecedor = '';
  buttonAtivado = true;


  constructor(private itemService: ItemService,
              private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog
              // private imageService: ImageService,
              // private configuracoesbuscaService: ConfiguracaoBuscaService,
              // private parceiroService: ParceiroService,
              // private sincronizarBancoDeDadosService: sincronizarBancoDeDadosService
              ) {    
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

  
  ngOnInit(): void {

    this.retrieveItensPage(this.pageNumber,10);
    // this.retrieveParceiros();
   
  }
  post:any=[];
  onScroll(){
    //Criar uma variavel pra guardar tudo
    //Toda vez que tu arrasta que vai enfiando os itens nela
    
    this.limitNumber = this.limitNumber+10;
    console.log('Down');
    this.retrieveItensPage(0,this.limitNumber);//1-1 -> 2-2 -> 1-3
  }
  // retrieveParceiros(): void{
  //   this.parceiroService.getAll()
  //     .subscribe(
  //       data => {
  //         this.parceiroCollection = data;
  //         if (this.debug) console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }
  setarConfiguracoes(): void{
    this.buttonAtivado = false;
    // this.retriveConfiguracoes();
  }
  // retriveConfiguracoes(): void{
  //   this.configuracoesbuscaService.getAll()
  //   .subscribe(
  //     data=> {
  //       this.ConfiguracoesCollection = data;
  //       if (this.debug) console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  //     }
  retrieveItens(): void {
    this.itemService.getAll()
      .subscribe(
        data => {
          this.ItemCollection = data;
          this.estaCarregandoSpinner = false;
          if (this.debug) console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveItensPage(page:any,limit:any): void {
    this.itemService.getPage(page,limit).subscribe(data=>{
      this.ItemCollection=data;
      this.estaCarregandoSpinner = false;
    })
  }
  refreshList(): void {
    this.retrieveItensPage(0,10);
    this.currentItem = {};
    // this.currentConfiguracoes = {};
    this.currentIndex = -1;
  }
  // setActiveConfig(configuracaoBusca : ConfiguracaoBusca){
  //   this.currentConfiguracoes= configuracaoBusca;
    
  // }
  setActiveItem(item: Item, index: number): void {
    this.currentItem = item;
    this.currentIndex = index;
    // this.imageRetriever();
    
  }

  removeAllItens(): void {
    this.itemService.deleteAll()
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchDescricao(): void {
    this.currentItem = {};
    this.currentIndex = -1;

    this.itemService.findByDescricao(this.descricao,0,100)
      .subscribe(
        data => {
          this.ItemCollection = data;
          if (this.debug) console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  // searchFornecedor(): void{
  //     this.currentItem = {};
  //     this.currentIndex = -1;
       
  //     this.itemService.findByFornecedor(this.selected)
  //       .subscribe(
  //         data => {
  //           this.ItemCollection = data;
  //           if (this.debug) console.log(data);
  //         },
  //         error => {
  //           console.log(error);
  //         });
  // }

  // imageRetriever() {
  //   console.log(this.currentItem.imagensdoitem);
  //   this.imageService.getById(this.currentItem.imagensdoitem)
  //   .subscribe(
  //     data => {
  //       if (this.debug) console.log(data);
  //       this.base64Data = data;
  //     }
  //   )
  // }

  deleteItem(item: Item): void {
    this.itemService.delete(item.id)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }


  // realizarBusca(configuracaoBusca: ConfiguracaoBusca): void{

  //     this.ItemCollection?.forEach((item)=>{
  //       const data = {
  //         item: item.item,
  //         descricao: item.descricao,
  //         barras: item.barras,
  //         quantidadeEstoque:item.quantidadeEstoque,
  //         preco: item.preco,
  //         precominimo: item.precominimo,
  //         referencia: item.referencia,
  //         marca: item.marca,
  //         parceiro: item.parceiro,
  //         config: configuracaoBusca,
  //       };
  //         this.itemTroca.push(data);
  //     });
  

  //     console.log(this.itemTroca);


  //     this.configuracoesbuscaService.start2(this.itemTroca)
  //     .subscribe(
  //       response => {
  //         if (this.debug) console.log(response);
  //         this.refreshList();
  //       },
  //       error => {
  //         console.log(error);
  //       });
  //       this.itemTroca=[];
  // }
  OnPageChange(event: PageEvent) {
    this.estaCarregandoSpinner=true;
    console.log(event);
    setTimeout(() => {
      this.retrieveItensPage(event.pageIndex+1,event.pageSize);
    }, 500);
    
    
    }
    teste(): void{
      console.log("ola mundo");
    }
    importarDados(): void{
    //     this.sincronizarBancoDeDadosService.importarDados('a').subscribe();
    //     console.log('Ola');
    }

    toggleView() {
      this.isCardView = !this.isCardView;
      const currentView = this.isCardView ? 'card' : 'list';
      this.router.navigate(['/item'], { queryParams: { view: currentView } });
    }
      // Método para navegar para os detalhes do item e preservar o estado atual da página
      navigateToDetails(itemId: number) {
        const currentView = this.isCardView ? 'card' : 'list';
        this.router.navigate([`item/detailsitem/${itemId}`], { queryParams: { view: currentView } });
      }

      navigateToWhatsapp(itemId: number) {
        const currentView = this.isCardView ? 'card' : 'list';
        this.router.navigate([`item/whatsapp/${itemId}`], { queryParams: { view: currentView } });
      }

      openImageDialog(item: any) {
        this.dialog.open(ImageDialogComponent, {
          data: { item: item },
          panelClass: 'custom-dialog-container'
        });
      }


      printItems() {
        // Obter os itens sendo exibidos, seja na visualização em cards ou em lista
        const itensParaImprimir = this.ItemCollection
    
        // Criar uma string vazia para armazenar as informações dos itens formatados
        let textoDosItens = '';
    
        // Loop através dos itens e formate as informações conforme desejado
        for (const item of itensParaImprimir) {
          // Adicione as informações do item à variável textoDosItens
          textoDosItens += `
            Nome: ${item.descricao}
            Código: ${item.item}
            Preço: ${item.preco}
            --------------------
          `;
        }
    
        // Criar uma nova janela para imprimir
        const janelaDeImpressao = window.open('', '_blank');
    
        // Escrever o texto formatado dos itens na nova janela
        janelaDeImpressao.document.write(`<pre>${textoDosItens}</pre>`);
    
        // Fechar a janela de impressão após escrever o conteúdo nela
        janelaDeImpressao.document.close();
    
        // Imprimir o conteúdo da nova janela
        janelaDeImpressao.print();
      }

      downloadCSV() {
        const itensParaCSV = this.ItemCollection;
    
        // Criar o cabeçalho do arquivo CSV
        let csv = 'Nome,Código,Preço\n';
    
        // Adicionar os dados dos itens no arquivo CSV
        for (const item of itensParaCSV) {
          csv += `${item.descricao},${item.item},${item.preco}\n`;
        }
    
        // Criar um Blob com o conteúdo do CSV
        const blob = new Blob([csv], { type: 'text/csv' });
    
        // Criar uma URL do Blob para disponibilizar o download
        const url = window.URL.createObjectURL(blob);
    
        // Criar um link temporário para o download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'itens.csv';
    
        // Adicionar o link ao corpo da página e clicar nele para iniciar o download
        document.body.appendChild(a);
        a.click();
    
        // Remover o link temporário e revogar a URL do Blob para liberar memória
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }

      printItensTeste(){
        this.printItemsPlanilha(this.obterAtributosDaClasse(this.item));

      }
        // Método para obter os campos dinamicamente da classe "Item", somente os selecionados
  getCamposDaClasseItem(): string[] {
    const camposSelecionados = Object.keys(this.camposSelecionados);
    return this.camposExibicao.filter((campo) => camposSelecionados.includes(campo));
  }

      printItemsPlanilha(campos: string[]) {
        // Obter os itens sendo exibidos, seja na visualização em cards ou em lista
        const itensParaImprimir = this.ItemCollection;
    
        // Criar uma string vazia para armazenar as informações dos itens formatados como uma tabela HTML
        let tabelaDosItens = `
          <table style="border-collapse: collapse; width: 100%;">
            <thead>
              <tr>
        `;
    
        // Adicionar os nomes dos campos como cabeçalhos da tabela
        for (const campo of campos) {
          tabelaDosItens += `
                <th style="border: 1px solid black; padding: 8px;">${campo}</th>
          `;
        }
    
        // Fechar a linha do cabeçalho da tabela
        tabelaDosItens += `
              </tr>
            </thead>
            <tbody>
        `;
    
        // Loop através dos itens e adicionar as informações na tabela
        for (const item of itensParaImprimir) {
          tabelaDosItens += `
            <tr>
          `;
    
          // Adicionar os valores dos campos para cada item
          for (const campo of campos) {
            tabelaDosItens += `
              <td style="border: 1px solid black; padding: 8px;">${item[campo]}</td>
            `;
          }
    
          tabelaDosItens += `
            </tr>
          `;
        }
    
        // Fechar a tabela HTML
        tabelaDosItens += `
            </tbody>
          </table>
        `;
    
        // Criar uma nova janela para imprimir
        const janelaDeImpressao = window.open('', '_blank');
    
        // Escrever a tabela HTML formatada na nova janela
        janelaDeImpressao.document.write(tabelaDosItens);
    
        // Fechar a janela de impressão após escrever o conteúdo nela
        janelaDeImpressao.document.close();
    
        // Imprimir o conteúdo da nova janela
        janelaDeImpressao.print();
      }

      obterAtributosDaClasse(instancia: any): string[] {
        const atributos: string[] = [];
      
        // Obtém as propriedades da instância da classe
        const propriedades = Object.getOwnPropertyNames(instancia);
      
        // Itera sobre as propriedades e verifica se são atributos
        for (const propriedade of propriedades) {
          if (instancia.hasOwnProperty(propriedade)) {
            // Verifica se o atributo é uma função (método)
            const ehMetodo = typeof instancia[propriedade] === 'function';
      
            // Verifica se o atributo não é uma função e não é uma propriedade do protótipo
            if (!ehMetodo && !instancia.__proto__.hasOwnProperty(propriedade)) {
              atributos.push(propriedade);
            }
          }
        }
      
        return atributos;
      }

      openPrintDialog(): void {
        this.camposExibicao = this.obterAtributosDaClasse(this.item);
        
        const dialogRef = this.dialog.open(DialogCamposComponent, {
          data: { camposExibicao: this.camposExibicao },
        });

        // Ao fechar a caixa de diálogo, obtemos os campos selecionados e chamamos a função printItems()
        dialogRef.afterClosed().subscribe((camposSelecionados) => {

          if (camposSelecionados) {
            this.camposSelecionados = camposSelecionados;
            this.printItemsPlanilha(Object.keys(camposSelecionados).filter((campo) => camposSelecionados[campo]));
          }

        });
      }


      switchToCardView() {
        this.isCardView = true;
        this.isListView = false;
        this.isGridView = false;
      }
    
      switchToListView() {
        this.isCardView = false;
        this.isListView = true;
        this.isGridView = false;
      }
    
      switchToGridView() {
        this.isCardView = false;
        this.isListView = false;
        this.isGridView = true;
      }
  

      
    
}


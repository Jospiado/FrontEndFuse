import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-campos',
  templateUrl: './dialog-campos.component.html',
  styleUrls: ['./dialog-campos.component.scss']
})
export class DialogCamposComponent {
  
  camposExibicao: string[]; // Array com os campos disponíveis para exibição
  camposSelecionados: { [campo: string]: boolean }; // Objeto que armazenará os campos selecionados

  constructor(
    public dialogRef: MatDialogRef<DialogCamposComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { camposExibicao: string[] }
  ) {
    this.camposExibicao = data.camposExibicao;
    this.camposSelecionados = {};

    for (const campo of this.camposExibicao) {
      this.camposSelecionados[campo] = true; // Inicialmente todos os campos estarão selecionados
    }


  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}

import { Component, OnInit } from "@angular/core";
import { IItemLinha } from "../model/i-item-linha";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public linhas: IItemLinha[] = [];
  public corAtual: string = "";
  public corPadrao: string = "#CCC";
  public corVazia: string = "#FFF";
  public novaCor: string = "#F00";

  public ngOnInit(): void {
    this.preencherCoresPadroes();
  }

  public alterarCor(pixels: string): void {
    const membrosPixels: string[] = pixels.split(".");
    const linhaIndice: number = parseFloat(membrosPixels[0]);
    const colunaIndice: number = parseFloat(membrosPixels[1]);

    this.alterarCoresDaLinha(linhaIndice, colunaIndice);
  }

  private alterarCoresDaLinha(linhaIndice: number, colunaIndice: number): void {
    const quantDeColunas: number = this.linhas[linhaIndice].colunasCores.length - 1;
    const quantDeLinhas: number = this.linhas.length - 1;
    const corDoPixel: string = this.linhas[linhaIndice].colunasCores[colunaIndice];

    this.corAtual = corDoPixel;
    this.alterarCorDoPixel(linhaIndice, colunaIndice);

    const podeLerNaEsquerda: boolean = colunaIndice > 0;
    const podeLerNaDireita: boolean = colunaIndice + 1 <= quantDeColunas;
    const podeLerParaBaixo: boolean = linhaIndice + 1 <= quantDeLinhas;
    const podeLerParaCima: boolean = linhaIndice - 1 <= quantDeLinhas;

    if (podeLerNaEsquerda) {
      const indiceColunaNaEsquerda = colunaIndice - 1;
      const podeLerIndice: boolean = indiceColunaNaEsquerda >= 0;

      this.verificarVizinhosEAlterarCor(linhaIndice, indiceColunaNaEsquerda, podeLerIndice);
    }

    if (podeLerNaDireita) {
      const indiceColunaNaDireita = colunaIndice + 1;
      const podeLerIndice: boolean = indiceColunaNaDireita <= quantDeColunas;

      this.verificarVizinhosEAlterarCor(linhaIndice, indiceColunaNaDireita, podeLerIndice);
    }

    if (podeLerParaBaixo) {
      const indiceLinhaDeBaixo: number = linhaIndice + 1;
      const podeLerIndice: boolean = indiceLinhaDeBaixo <= quantDeLinhas;

      this.verificarVizinhosEAlterarCor(indiceLinhaDeBaixo, colunaIndice, podeLerIndice);
    }

    if (podeLerParaCima) {
      const indiceLinhaDeCima: number = linhaIndice - 1;
      const podeLerIndice: boolean = indiceLinhaDeCima >= 0;

      this.verificarVizinhosEAlterarCor(indiceLinhaDeCima, colunaIndice, podeLerIndice);
    }
  }

  private verificarVizinhosEAlterarCor(indiceLinha: number, indiceColuna: number, podeLerIndice: boolean): void {
    if (!podeLerIndice)
      return;

    const corDoColunaDeCima: string = this.linhas[indiceLinha].colunasCores[indiceColuna];

    if (corDoColunaDeCima === this.corAtual)
      this.alterarCoresDaLinha(indiceLinha, indiceColuna);
  }

  private alterarCorDoPixel(linhaIndice: number, colunaIndice: number): void {
    this.linhas[linhaIndice].colunasCores[colunaIndice] = this.novaCor;
  }

  private preencherCoresPadroes(): void {
    this.linhas.push(
      {
        colunasCores: [
          this.corVazia,
          this.corPadrao,
          this.corPadrao,
          this.corPadrao,
          this.corVazia,
          this.corVazia
        ]
      },
      {
        colunasCores: [
          this.corVazia,
          this.corPadrao,
          this.corVazia,
          this.corVazia,
          this.corPadrao,
          this.corVazia
        ]
      },
      {
        colunasCores: [
          this.corVazia,
          this.corPadrao,
          this.corPadrao,
          this.corPadrao,
          this.corVazia,
          this.corVazia
        ]
      },
      {
        colunasCores: [
          this.corVazia,
          this.corPadrao,
          this.corVazia,
          this.corVazia,
          this.corVazia,
          this.corVazia
        ]
      }
    );
  }
}

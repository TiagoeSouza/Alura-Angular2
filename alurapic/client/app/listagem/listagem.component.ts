import { Component } from "@angular/core";
import { Http } from '@angular/http';
import { FotoService } from "../foto/foto.service";
import { FotoComponent } from "../foto/foto.component";
import { PainelComponent } from "../painel/painel.component";

@Component({
    moduleId: module.id,
    selector: 'listagem',
    templateUrl: './listagem.component.html'
})
export class ListagemComponent {
    fotos: FotoComponent[] = [];
    service: FotoService;
    mensagem: string = "";

    constructor(service: FotoService) {

        this.service = service;
        this.service
            .lista()
            .subscribe(fotos => {
                this.fotos = fotos;
            }, erro => console.log(erro));
    }

    remove(foto: FotoComponent, painel: PainelComponent) {
        // if (confirm('Deseja realmente excluir a foto selecionada?')) {
        this.service.remove(foto)
            .subscribe(
                () => {
                    painel.fadeOut(() => {

                        let novasFotos = this.fotos.slice(0);
                        let indice = novasFotos.indexOf(foto);
                        novasFotos.splice(indice, 1);
                        this.fotos = novasFotos;

                        console.log("Foto Removida com Sucesso");
                        this.mensagem = "Foto removida com sucesso";
                    });
                },
                error => {
                    console.log(error);
                    this.mensagem = "Não foi possível remover a foto";
                });

        window.scroll(0, 0);
        // }
    }
}
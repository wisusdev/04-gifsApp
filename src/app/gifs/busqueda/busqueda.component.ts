import {Component, ElementRef, ViewChild} from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {
	// Usamos el simbolo "!" para indicar que el objeto no es nulo
	@ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

	constructor(private gifsService: GifsService){

	}

	buscar(){
		const valor = this.txtBuscar.nativeElement.value;
		if(valor.trim().length === 0){
			return;
		}
		this.gifsService.buscarGifs(valor);
		this.txtBuscar.nativeElement.value = '';
	}
}

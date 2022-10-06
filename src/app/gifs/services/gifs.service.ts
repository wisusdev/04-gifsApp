import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Gif, SeachGIFResponse} from "../interfaces/gifs.interface";

@Injectable({
	providedIn: 'root'
})
export class GifsService {
	private apiKey: string = ''; // Aquí debe ir el API key de giphy
	private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
	private _historial: string[] = [];
	public resultados: Gif[] = [];

	constructor(private http: HttpClient) {
		this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
		this.resultados = JSON.parse(localStorage.getItem('ultimos_resultados')!) || [];
	}

	get historial(){
		return [...this._historial];
	}

	buscarGifs(query: string = ''){

		query = query.trim().toLowerCase();

		if(!this._historial.includes(query)){
			this._historial.unshift(query);
			this._historial = this._historial.splice(0,9);
			localStorage.setItem('historial', JSON.stringify(this._historial));
		}

		const params = new HttpParams().set('api_key', 'F7DkmA0Vujgn0AktanUvizOfmzyNlc1l').set('q', query).set('limit', '20');

		this.http.get<SeachGIFResponse>(`${this.serviceUrl}/search`, {params})
			.subscribe((response ) => {
				this.resultados = response.data;
				localStorage.setItem('ultimos_resultados', JSON.stringify(response.data));
			})
	}
}

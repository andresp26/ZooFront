import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private httpClient: HttpClient) { }


  getBaseQuery(query:string){
    const baseQuery =`http://localhost:8080/Zoo/api/${ query }`;
    return baseQuery;
  }

  getSpecies(){
      var url = this.getBaseQuery('especies');
      return this.httpClient.get(url);
  }

  getTipoAnimal(){
    var url = this.getBaseQuery('tipoAnimal');
    return this.httpClient.get(url);
  }

  getHorarios(){
    var url = this.getBaseQuery('horarioTipoAlimento');
    return this.httpClient.get(url);
  }

  getCuidadores(){
    var url = this.getBaseQuery('cuidador');
    return this.httpClient.get(url);
  }

  getAnimales(){
    var url = this.getBaseQuery('animales');
    return this.httpClient.get(url);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  constructor(private httpClient: HttpClient) {}

  
  getBaseQuery(query: string) {
    const baseQuery = `http://localhost:8080/Zoo/api/${query}`;
    return baseQuery;
  }

  getSpecies() {
    const url = this.getBaseQuery('especies');
    return this.httpClient.get(url);
  }

  getTipoAnimal() {
    const url = this.getBaseQuery('tipoAnimal');
    return this.httpClient.get(url);
  }

  getHorarios() {
    const url = this.getBaseQuery('horarioTipoAlimento');
    return this.httpClient.get(url);
  }

  getCuidadores() {
    const url = this.getBaseQuery('cuidador');
    return this.httpClient.get(url);
  }

  getAnimales() {
    const url = this.getBaseQuery('animales');
    return this.httpClient.get(url);
  }

  SetAnimal(Animal: any) {
    return this.httpClient.post('http://localhost:8080/Zoo/api/animales' ,  Animal , {});
  }

  UpdateAnimal(Animal: any , id: number) {
    const param = {
      id: id ? id.toString() : '',
      Animales: Animal
    };
    return this.httpClient.put('http://localhost:8080/Zoo/api/animales' , param , {});
  }

  DelAnimal(AnimalesId: number) {
    return this.httpClient.delete(`http://localhost:8080/Zoo/api/animales/${AnimalesId}`);
  }
}

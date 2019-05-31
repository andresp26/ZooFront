import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class ShowService {
        constructor(private httpClient:HttpClient){}


    getBaseQuery(query: string) {
        const baseQuery = `http://localhost:8080/Zoo/api/${query}`;
        return baseQuery;
    }

    getAllShows(){  
        const url = this.getBaseQuery('animalesShow');
        return this.httpClient.get(url);
    }

    getLugares(){  
        const url = this.getBaseQuery('lugares');
        return this.httpClient.get(url);
    }

  }
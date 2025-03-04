import { Injectable,inject } from '@angular/core';
import { Prodcut } from '../product';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {
  httpClient = inject(HttpClient);
  constructor() { }


  getProducts(){
    return this.httpClient.get<Prodcut[]>("http://localhost:8004/products");

  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  httpClient = inject(HttpClient);
  constructor() { }

  getCustomers(){
    return this.httpClient.get<Customer[]>("http://localhost:8004/customer");
    

  }
}

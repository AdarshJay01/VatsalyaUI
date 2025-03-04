import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Order } from './order';
import { item } from './item';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  httpClient = inject(HttpClient);
  item: item[] = [];
  id!: string;
  order!: Order;

  constructor() {}

  getOrders() {
    return this.httpClient.get<Order[]>('http://localhost:8004/order');
  }
  getItemCount(){
    return this.httpClient.get<any>('http://localhost:8004/order/getCount');
  }
  updateItem() {
    return this.httpClient.put;
  }

  retriveItem() {
    return this.item;
  }
  retriveId() {
    return this.id;
  }

  retriveOrd(){
    return this.order;
  }

  getItems(id: string, ord: Order) {
    
    this.id = id;
    this.order = ord;
    return id;
  }
}

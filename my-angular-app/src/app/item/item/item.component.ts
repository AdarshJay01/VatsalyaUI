import { Component, inject } from '@angular/core';
import { OrderService } from '../../navbar/nav/order/order.service';
import { item } from '../../navbar/nav/order/item';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Order } from '../../navbar/nav/order/order';
import { MatDialog } from '@angular/material/dialog';
import { DialogItemComponent } from './Dialog/dialog-item/dialog-item.component';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [HttpClientModule, MatIcon, MatTableModule, MatCardModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent {
  displayedColumns: string[] = ['item', 'quantity', 'price'];
  orderserv = inject(OrderService);
  item: any;
  id!: string;
  ord!: Order;
  http = inject(HttpClient);

  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog
      .open(DialogItemComponent, {
        width: '50%',
        height: '60%',
      })
      .afterClosed()
      .subscribe((val) => {
        this.ngOnInit();
      });
  }
  ngOnInit() {
    this.id = this.orderserv.retriveId();
    console.log(this.id);
    this.ord = this.orderserv.retriveOrd();
    const url = 'http://localhost:8004/order/item/' + this.id;
    console.log(url);
    this.http.get(url).subscribe((res) => {
      this.item = res;
      console.log(this.item);
    });
  }

  updateItem(name: string, ind: string) {
    const url =
      'http://localhost:8004/order/' + name + '/' + ind + '/' + this.id;
    console.log(url);
    this.http.put(url, this.ord).subscribe(() => {
      this.ngOnInit();
    });
  }
}

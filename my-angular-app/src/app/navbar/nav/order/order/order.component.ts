import { Component, inject, ViewChild, OnInit } from '@angular/core';
import { Order } from '../order';
import { jsPDF } from 'jspdf';

import { OrderService } from '../order.service';
import Chart from 'chart.js/auto';
import { Colors } from 'chart.js';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { item } from '../item';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    MatButtonModule,
    
  ],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'custId',
    'name',
    'orderdate',
    'options',
    'status',
    'price',
  ];
  filteredorder: Order[] = [];
  flag: boolean = false;
  dataSource!: MatTableDataSource<Order>;
  itemkeys: string[] = [];
  itemcount: number[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  orderservice = inject(OrderService);
  private router: Router = inject(Router);

  constructor(private http: HttpClient,private dialog: MatDialog) {}
  openDialog() {
    this.dialog
      .open(OrderDialogComponent, {
        width: '50%',
        height: '70%',
      })
      .afterClosed()
      .subscribe((val) => {
        this.ngOnInit();
      });
  }
  editRoom(row:any){
    this.dialog.open(OrderDialogComponent,{
      width:'40%',
      height:'70%',
      data:row
    }).afterClosed().subscribe(val=>{
      this.ngOnInit();
    });}
  ngOnInit() {
    this.orderservice.getOrders().subscribe((result) => {
      this.filteredorder = result;
      console.log('filteredorder: ', this.filteredorder);
      this.dataSource = new MatTableDataSource(this.filteredorder);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.orderservice.getItemCount().subscribe((result) => {
      let categoryMap1 = new Map<string, number>();
      categoryMap1 = new Map(Object.entries(result));
      this.itemkeys = Array.from(categoryMap1.keys());
      this.itemcount = Array.from(categoryMap1.values());
      console.log(this.itemcount);
      this.revenueCheck();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getList(items: item[], id: string, ord: Order) {
    if (items) {
      this.orderservice.getItems(id, ord);
      this.router.navigateByUrl('/nav/item');
    }
  }
  dodelete(id: string) {
    const url = 'http://localhost:8004/order/' + id;
    this.http.delete(url).subscribe(() => {
      this.ngOnInit();
    });
  }

  revenueCheck() {
    new Chart('revenue', {
      type: 'pie',
      data: {
        labels: this.itemkeys,
        datasets: [
          {
            label: 'Item Distribution',
            data: this.itemcount,
            borderWidth: 1,
          },
        ],
      },
      options: {},
    });
  }


  generatePDF(row:Order){
    const doc = new jsPDF();
  
    doc.setFont('helvetica');
    doc.setFontSize(16);
  
    // Add title
    doc.text('Order Receipt', 20, 20);
    doc.text(`Order ID: ${row.id}`, 20, 30);
    doc.text(`Customer ID: ${row.custId}`, 20, 40);
    doc.text(`Name: ${row.name}`, 20, 50);
    doc.text(`Order Date: ${row.orderdate}`, 20, 60);
    doc.text(`Shipping Address: ${row.addr}`, 20, 70);
    doc.text(`Total Price: Rs ${row.price}`, 20, 80);
  
    // Add products (loop through the products array)
    let yPosition = 90;
    row.products.forEach((product, index) => {
      doc.text(`Product ${index + 1}: ${product.item}`, 20, yPosition);
      doc.text(`Quantity: ${product.quantity}`, 20, yPosition + 10);
      doc.text(`Price: Rs ${product.price}`, 20, yPosition + 20);
      yPosition += 30;
    });
  
    // Save the document (download the PDF)
    doc.save(`receipt_${row.id}.pdf`);
  }
}





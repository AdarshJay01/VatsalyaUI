import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
import { MatDialog } from '@angular/material/dialog';
import { DialogcustomerComponent } from './Dialog/dialogcustomer/dialogcustomer.component';
@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    HttpClientModule,
    MatTableModule,
    CommonModule,
    NgbModule,
    MatInputModule,
    MatPaginator,
    MatIcon,
    
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export class CustomerComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<Customer>;
  displayedColumns: string[] = ['id', 'name', 'phno', 'history'];
  custservice = inject(CustomerService);
  constructor(private http: HttpClient, private dialog: MatDialog) {}
  openDialog() {
    this.dialog
      .open(DialogcustomerComponent, {
        width: '50%',
        height: '70%',
      })
      .afterClosed()
      .subscribe((val) => {
        this.ngOnInit();
      });
  }

  editRoom(row:any){
    this.dialog.open(DialogcustomerComponent,{
      width:'40%',
      height:'70%',
      data:row
    }).afterClosed().subscribe(val=>{
      this.ngOnInit();
    });
  
  
   
  
  }
  ngOnInit() {
    this.custservice.getCustomers().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

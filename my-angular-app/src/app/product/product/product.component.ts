import { Component, OnInit, inject } from '@angular/core';
import { Prodcut } from '../product'; // Make sure this is the correct name
import { ProductserviceService } from './productservice.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogProductComponent } from './Dialog/dialog-product/dialog-product.component';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [HttpClientModule,CommonModule,MatIcon], // This should be HttpClientModule
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'] // Corrected here
})
export class ProductComponent implements OnInit {
  
  product: Prodcut[] = []; // Fixed typo here
  filteredProduct: Prodcut[] = [];
  productservice = inject(ProductserviceService);
  searchTerm: string = '';




  
  



  constructor(private http: HttpClient,private dialog: MatDialog) {}

  ngOnInit() {
    this.productservice.getProducts().subscribe((res) => {
      this.product = res;
      this.filteredProduct = this.product;
    });
  }

  filterProducts() {
    if (!this.searchTerm) {
      this.filteredProduct = this.product;
    } else {
      this.filteredProduct = this.product.filter(item =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  deleteProduct(id:string){
    const url = 'http://localhost:8004/prodcuts/delete/'+id;
    this.http.delete(url).subscribe((res)=>{
      this.ngOnInit();
    })


  }
  onInputChange(event: any) {
   
    this.searchTerm = event.target.value; // Now TypeScript knows this is an HTMLInputElement
  }

  openDialog() {
    this.dialog
      .open(DialogProductComponent, {
        width: '50%',
        height: '70%',
      })
      .afterClosed()
      .subscribe((val) => {
        this.ngOnInit();
      });
  }

  
  editRoom(row:any){
    this.dialog.open(DialogProductComponent,{
      width:'40%',
      height:'70%',
      data:row
    }).afterClosed().subscribe(val=>{
      this.ngOnInit();
    });
  
  
   
  
  }

}

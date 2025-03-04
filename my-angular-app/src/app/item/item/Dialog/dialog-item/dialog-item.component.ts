import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Component, Inject, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../../../../navbar/nav/order/order.service';
import { Order } from '../../../../navbar/nav/order/order';

@Component({
  selector: 'app-dialog-item',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog-item.component.html',
  styleUrl: './dialog-item.component.scss',
})
export class DialogItemComponent {
  productform!: FormGroup;
  actionBtn: string = 'Save';
  ordSer = inject(OrderService);
  id: string | undefined;
  ord: Order | undefined;

  constructor(
    private fb: FormBuilder,

    private dialogref: MatDialogRef<DialogItemComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  http = inject(HttpClient);
  addRoom(productForm: any) {
    console.log(productForm);

    if (!this.editData) {
      if (productForm.valid) {
        this.id = this.ordSer.retriveId();
        this.ord = this.ordSer.retriveOrd();
        const url =
          'http://localhost:8004/order/' +
          productForm.value.item +
          '/' +
          productForm.value.quantity +
          '/' +
          this.id;
        console.log(url);
        this.http.post(url, this.ord).subscribe((res) => {
          this.productform.reset();
          this.dialogref.close('save');
          
        });
      }
    }
  }

  ngOnInit(): void {
    this.id = this.ordSer.retriveId();
    this.ord = this.ordSer.retriveOrd();
    console.log(this.id,this.ord);
    this.productform = this.fb.group({
      item: ['', Validators.required],
      quantity: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      // this.productform.controls['name'].setValue(this.editData.name);
      // this.productform.controls['email'].setValue(this.editData.email);
      // this.productform.controls['phno'].setValue(this.editData.phno);
      // this.productform.controls['company'].setValue(this.editData.company);
    }
  }
}

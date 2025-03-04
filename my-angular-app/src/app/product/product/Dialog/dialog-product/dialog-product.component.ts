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
@Component({
  selector: 'app-dialog-product',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog-product.component.html',
  styleUrl: './dialog-product.component.scss',
})
export class DialogProductComponent {
  productform!: FormGroup;
  actionBtn: string = 'Save';

  constructor(
    private fb: FormBuilder,

    private dialogref: MatDialogRef<DialogProductComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}
  http = inject(HttpClient);
  addRoom() {
    if (!this.editData) {
      const url = 'http://localhost:8004/products';

      this.http.post(url, this.productform.value).subscribe((res) => {
        this.productform.reset();
        this.dialogref.close('save');
      });
    } else if (this.editData) {

      const url = 'http://localhost:8004/products/' + this.editData.id;
      this.http.put(url, this.productform.value).subscribe(() => {
        this.productform.reset();
        this.dialogref.close('update');
      });
    }
  }
  ngOnInit(): void {
    this.productform = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      volume: [''],
      quantity: ['', Validators.required],
      indivol: [''],
      price: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.productform.controls['name'].setValue(this.editData.name);
      this.productform.controls['quantity'].setValue(this.editData.quantity);
      this.productform.controls['category'].setValue(this.editData.category);
      this.productform.controls['volume'].setValue(this.editData.volume);
      this.productform.controls['price'].setValue(this.editData.price);
      this.productform.controls['indivol'].setValue(this.editData.indivol);
    }
  }
}

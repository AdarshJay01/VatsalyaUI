
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
  selector: 'app-order-dialog',
  standalone: true,
  imports: [   MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,],
  templateUrl: './order-dialog.component.html',
  styleUrl: './order-dialog.component.scss'
})
export class OrderDialogComponent {

  productform!: FormGroup;
  actionBtn: string = 'Save';
  constructor(
    private fb: FormBuilder,

    private dialogref: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}
  http = inject(HttpClient);
  addRoom(){
    if(this.productform.valid){
      const url = 'http://localhost:8004/order';
      
    
      this.http.post(url, this.productform.value).subscribe((res)=>{
        this.productform.reset();
        this.dialogref.close('save');
    
      })
    }
  }
  
  ngOnInit(): void {

    this.productform = this.fb.group({
      name: ['', Validators.required],
      orderdate: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.productform.controls['name'].setValue(this.editData.name);
      // this.productform.controls['email'].setValue(this.editData.email);
      this.productform.controls['orderdate'].setValue(this.editData.orderdate);

    }
  }
}
    




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
  selector: 'app-dialogcustomer',
  standalone: true,
  imports: [    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,],
  templateUrl: './dialogcustomer.component.html',
  styleUrl: './dialogcustomer.component.scss'
})
export class DialogcustomerComponent {
  productform!: FormGroup;
  actionBtn: string = 'Save';

  constructor(
    private fb: FormBuilder,

    private dialogref: MatDialogRef<DialogcustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}
  http = inject(HttpClient);
  addRoom(){
    if(this.productform.valid){
      const url = 'http://localhost:8004/customer';
      
    
      this.http.post(url, this.productform.value).subscribe((res)=>{
    
   
        this.productform.reset();
        this.dialogref.close('save');
    
      })
    }
  }
  ngOnInit(): void {

    this.productform = this.fb.group({
      name: ['', Validators.required],
      phno: ['', Validators.required],
      addr: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.productform.controls['name'].setValue(this.editData.name);
      // this.productform.controls['email'].setValue(this.editData.email);
      this.productform.controls['phno'].setValue(this.editData.phno);
      this.productform.controls['addr'].setValue(this.editData.addr);
    }
  }
}

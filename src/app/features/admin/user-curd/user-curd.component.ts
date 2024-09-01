import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-curd',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './user-curd.component.html',
  styleUrl: './user-curd.component.css'
})
export class UserCurdComponent implements OnInit {
  rowForm!: FormGroup;
  rows: Array<{ carName: string; featured: boolean; carImage: string }> = [];
  editIndex: number | null = null;
  editMode = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.rowForm = this.fb.group({
      carName: ['', Validators.required],
      featured: [false],
      carImage: ['', Validators.required],
    });
  }

  onFileChange(event: any) {
    console.log(event);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.rowForm.patchValue({ carImage: reader.result });
    };
    reader.readAsDataURL(file);
  }

  addOrUpdateRow() {
    if (this.rowForm.valid) {
      if (this.editMode && this.editIndex !== null) {
        this.rows[this.editIndex] = this.rowForm.value;
        this.editMode = false;
        this.editIndex = null;
      } else {
        this.rows.push(this.rowForm.value);
      }
      this.rowForm.reset({ carName: '', featured: false, carImage: '' });
    }
  }

  editRow(index: number) {
    console.log(index + " index number");
    this.rowForm.setValue(this.rows[index]);
    this.editIndex = index;
    this.editMode = true;
  }

  deleteRow(index: number) {
    console.log(index);

    this.rows.splice(index, 1);
    if (this.editMode && this.editIndex === index) {
      this.editMode = false;
      this.editIndex = null;
      this.rowForm.reset({ carName: '', featured: false, carImage: '' });
    }

  }
}
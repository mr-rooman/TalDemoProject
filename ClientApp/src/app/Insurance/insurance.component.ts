import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html'
})
export class InsuranceComponent implements OnInit { 
  form1: FormGroup;
  form2: FormGroup;
  public form1display = true;
  public form2display = false;
  public totalValue: number = 0;
  public sumInsured: number;
  public age: number;
  public occupation: string;
  public occupationList = ['Cleaner', 'Doctor', 'Author', 'Farmer', 'Mechanic', 'Florist'];
  public rating = { "Cleaner": 1.7, "Doctor": 1.1, "Author": 1.45, "Farmer": 2.1, "Mechanic": 2.1, "Florist":1.7 }
  public stateList = ['State 1', 'State 2'];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form1 = this.formBuilder.group({
      name: [null, [Validators.required]],
      age: [null, Validators.required],
      birthDate: [null, Validators.required],
    });

    this.form2 = this.formBuilder.group({
      occupation: [null, [Validators.required]],
      sumInsured: [null, [Validators.required, Validators.max(1000000), Validators.min(1000)]],
      monthlyExpense: [null, Validators.required],
      state: [null, Validators.required], 
      postCode: [null, [Validators.required, Validators.max(9999), Validators.min(1000)]],
      totalValue: [null, Validators.required]
    });
  }

  isForm1FieldValid(field: string) {
    return !this.form1.get(field).valid && this.form1.get(field).touched;
  }

  isForm2FieldValid(field: string) {
    return !this.form2.get(field).valid && this.form2.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isForm1FieldValid(field),
      'has-feedback': this.isForm1FieldValid(field)
    };
  }

  onForm1Submit() {
    console.log(this.form1);
    if (this.form1.valid) {      
      console.log('form1 submitted');
      this.form1display = false;
      this.form2display = true;
    } else {
      this.validateAllFormFields(this.form1);
    }
  }
  onForm2Submit() {
    console.log(this.form2);
    if (this.form2.valid) {
      console.log('form2 submitted');
      this.calculateTotalValue();
    } else {
      this.validateAllFormFields(this.form2);
    }
  }

  showForm1() {
    this.form1display = true;
    this.form2display = false;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  calculateTotalValue() {   
    console.log(this.occupation);
    console.log(this.rating[this.occupation]);
    this.totalValue = (this.sumInsured * this.rating[this.occupation]) / (100 * 12 * this.age);
  }
  
}



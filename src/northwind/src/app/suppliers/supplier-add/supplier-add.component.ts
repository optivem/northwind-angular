import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { SupplierService } from '../shared/supplier.service';

@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.css']
})
export class SupplierAddComponent implements OnInit {

  supplierForm: FormGroup;
  company: string='';
  isLoadingResults = false;

  constructor(private router: Router, private service: SupplierService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.supplierForm = this.formBuilder.group({
      'company' : [null, Validators.required],
      'lastName' : [null, Validators.required],
      'firstName' : [null, Validators.required],
      'emailAddress' : [null, Validators.required],
      'jobTitle' : [null, Validators.required],
      'businessPhone' : [null, Validators.required],
      'homePhone' : [null, Validators.required],
      'mobilePhone' : [null, Validators.required],
      'faxNumber' : [null, Validators.required],
      'address' : [null, Validators.required],
      'city' : [null, Validators.required],
      'stateProvince' : [null, Validators.required],
      'zipPostalCode' : [null, Validators.required],
      'countryRegion' : [null, Validators.required],
      'webPage' : [null, Validators.required],
      'notes' : [null, Validators.required]
    });
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.service.addSupplier(form)
      .subscribe(res => {
          let id = res['id'];
          this.isLoadingResults = false;
          this.router.navigate(['/supplier-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}

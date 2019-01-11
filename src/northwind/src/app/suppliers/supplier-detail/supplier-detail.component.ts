import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SupplierService } from '../shared/supplier.service';
import { Supplier } from '../shared/supplier';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css']
})
export class SupplierDetailComponent implements OnInit {

  supplier: Supplier = { id: 0, 
    company: '', 
    contactName: '',
    contactTitle: '',
    address: '',
    city: '',
    region: '',
    postalCode: '',
    country: '',
    phone: '',
    fax: '',
    homePage: ''
  };
  
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private service: SupplierService, private router: Router) { }

  ngOnInit() {
    this.getSupplierDetails(this.route.snapshot.params['id']);
  }

  getSupplierDetails(id) {
    this.service.getSupplier(id)
      .subscribe(data => {
        this.supplier = data;
        console.log(this.supplier);
        this.isLoadingResults = false;
      });
  }

  deleteSupplier(id) {
    this.isLoadingResults = true;
    this.service.deleteSupplier(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/suppliers']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
import { CompanyUpdateDto } from './../../Service/Dto/CompanyUpdateDto';
import { CompanyService } from './../../Service/CompanyService';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { CompanyDetailDto } from '../../Service/Dto/CompanyDetailDto';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'detail-company',
  imports: [ReactiveFormsModule,NgIf,RouterModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailCompanyComponent implements OnInit{
  
  isEditing = false;
  companyDetail : CompanyDetailDto = {
    id : 0,
    name : '',
    address : '',
    phone : '',
    email: '',
  }

  companyUpdateDto : CompanyUpdateDto = {
    name : '',
    address : '',
    phone : '',
    email: '',
  }
  Company = new FormGroup({
    name: new FormControl(''),
    address : new FormControl(''),
    email : new FormControl(''),
    phone : new FormControl(''),
  });
  id = '';
  constructor(private route : ActivatedRoute, private _companyService : CompanyService, private router : Router)
  {
    this.id = String(route.snapshot.paramMap.get('id'));
    console.log(this.id);
  }
  ngOnInit(): void {
    this.Company.disable();
    this.getDetailByIdCompany();
  }
  getDetailByIdCompany(){
    this._companyService.getByIdCompany(Number(this.id)).subscribe(res=>{
      this.companyDetail = res;
      this.Company.patchValue(res);
    });
  }
  handleCancel(){
    this.EditChange();
    this.getDetailByIdCompany();
  }
  handleExit(){
    this.router.navigate(['/']);
  }
  EditChange(){
    this.isEditing = !this.isEditing;
    if(this.isEditing)
    {
      this.Company.enable();
    }
    else
    {
      this.Company.disable();
    }
  }
  refresh(){
    this.isEditing = false;
    this.Company.disable();
    this.getDetailByIdCompany();
  }

  Save(){
    this.companyUpdateDto = this.Company.value as CompanyUpdateDto;
    this._companyService.updateCompany(Number(this.id), this.companyUpdateDto).subscribe({
      next : (res)=>{
        if(res)
          {
            alert("Cập nhật thành công");
            this.refresh();
          }
          else
          {
            alert("Cập nhật thất bại");
          }
      },
      error(eor)
      {
        alert("Cập nhật thất bại");
        console.log(eor);
      }
    });
  }
}

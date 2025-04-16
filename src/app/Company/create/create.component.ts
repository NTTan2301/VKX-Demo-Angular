import { RouterLink,Router } from '@angular/router';
import { CompanyCreateDto } from './../../Service/Dto/CompanyCreateDto';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CompanyService } from '../../Service/CompanyService';

@Component({
  selector: 'create-company',
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateCompanyComponent {
  Company = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
  });

  CompanyDto : CompanyCreateDto = {
    name: '',
    address : '',
    phone : '',
    email: '',
  }

  constructor(private _companyService : CompanyService,private router: Router){

  }

  handleSave(){
  debugger
    this.CompanyDto = this.Company.value as CompanyCreateDto;
    this.CreateCompany();
  }

  CreateCompany(){
    this._companyService.createCompany(this.CompanyDto).subscribe(res => {
      if(res.name == this.CompanyDto.name){
        alert("Thêm mới thành công");
        this.router.navigate(['/']);
      }
      else
      {
        alert("Thêm mới thất bại");
        console.log(res);
      }
    });
  }
  
}

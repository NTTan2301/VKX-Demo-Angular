import { CompanyService } from './../../Service/CompanyService';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CompanyGridDto } from '../../Service/Dto/CompanyGridDto';

@Component({
  selector: 'Company-list',
  imports: [NgFor,RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListCompanyComponent implements OnInit {
  LstCompany : CompanyGridDto[] = []

  constructor(private http: HttpClient,private _Service: CompanyService)
  {

  }

  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this._Service.getAllCompany().subscribe((data)=>{
      this.LstCompany = data;
    });
  }

  handleDelete(id : number)
  {
    this.LstCompany = this.LstCompany.filter(item=> item.id != id);
  }
}

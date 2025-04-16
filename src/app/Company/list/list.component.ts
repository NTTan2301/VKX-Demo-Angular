import { CompanyService } from './../../Service/CompanyService';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CompanyGridDto } from '../../Service/Dto/CompanyGridDto';

@Component({
  selector: 'Company-list',
  imports: [NgFor,RouterLink,RouterModule],
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
    var name = this.LstCompany.find(rs=> rs.id == id)?.name;
    const confirm = window.confirm("Bạn có chắc muốn xóa công ty'"+ name + "' không?");
    if(confirm)
    {
      this._Service.deleteCompany(id).subscribe({
        next : (res) =>{
          if(res)
          {
            alert("Xóa thành công");
            this.getAll();
          }
          else
          {
            alert("Xóa thất bại");
          }
        }
      })
    }
  }
}

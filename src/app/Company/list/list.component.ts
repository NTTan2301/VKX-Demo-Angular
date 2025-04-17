import { CompanyService } from './../../Service/CompanyService';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CompanyGridDto } from '../../Service/Dto/CompanyGridDto';
import { PagedTableComponent } from "../../Shared/Paging/paged-table/paged-table.component";
import { PagedResult } from '../../Shared/Paging/PagedResult';
import { PagingParams } from '../../Shared/Paging/PagingParams';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'Company-list',
  imports: [NgFor, RouterLink, RouterModule, 
    PagedTableComponent,CommonModule,FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListCompanyComponent implements OnInit {
  LstCompany : CompanyGridDto[] = [];
  filterName: '' = '';

  columns: { field: keyof CompanyGridDto; header: string }[]  = [
    { field: 'id', header: 'Id'},
    { field: 'name', header: 'name' },
    { field: 'address', header: 'address'},
    { field: 'phone', header: 'phone'},
    { field: 'email', header: 'email'},
    { field: 'image', header: 'image'},
  ];

  pagedResult: PagedResult<CompanyGridDto> = {
    items: [],
    totalCount: 0,
    pageNumber: 1,
    pageSize: 10
  };

  paging: PagingParams = {
    pageNumber: 1,
    pageSize : 10,
    filterName : '',
  };

  constructor(private http: HttpClient,private _Service: CompanyService)
  {

  }

  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this._Service.getPagedCompany(this.paging).subscribe((data)=>{
      this.pagedResult = data;
      debugger
    });
  }
  onPageChange(newPage: number) {
    this.paging.pageNumber = newPage;
    this.getAll(); // Gọi lại API để lấy dữ liệu trang mới
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

  onSearch()
  {
    debugger
    this.getAll();
  }


}

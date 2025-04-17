import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CompanyGridDto } from "./Dto/CompanyGridDto";
import { map } from 'rxjs/operators';
import { CompanyCreateDto } from './Dto/CompanyCreateDto';
import { CompanyDetailDto } from "./Dto/CompanyDetailDto";
import { CompanyUpdateDto } from "./Dto/CompanyUpdateDto";
import { PagingParams } from "../Shared/Paging/PagingParams";
import { PagedResult } from "../Shared/Paging/PagedResult";

@Injectable({providedIn: 'root'})
export class CompanyService{
    constructor(private http : HttpClient){

    }
    LstCompanyUrl = 'https://localhost:2301/api/Company';
    CreateCompanyUrl = 'http://localhost:8000/api/Company';
    detailCompanyUrl = 'http://localhost:8000/api/Company/';
    updateCompanyUrl = 'http://localhost:8000/api/Company/';
    deleteCompanyUrl = 'http://localhost:8000/api/Company/';
    getAllCompany(): Observable<CompanyGridDto[]>{
        return this.http.get<CompanyGridDto[]>(this.LstCompanyUrl).pipe(
            map(res =>
              res.map(item => ({
                ...item,
                image: 'assets/Icon/userIcon.png'
              }))
            )
          );
    }

    getPagedCompany(paging: PagingParams): Observable<PagedResult<CompanyGridDto>> {
      let params = new HttpParams()
        .set('pageNumber', paging.pageNumber.toString())
        .set('pageSize', paging.pageSize.toString());
    
        Object.keys(paging).forEach(key => {
          const value = (paging as any)[key];
          if (
            value !== undefined &&
            value !== null &&
            value !== '' &&
            key !== 'pageNumber' &&
            key !== 'pageSize'
          ) {
            params = params.set(key, value);
          }
        });
    
      return this.http.get<PagedResult<CompanyGridDto>>(this.LstCompanyUrl, { params }).pipe(
        map(res => ({
          ...res,
          items: res.items.map(item => ({
            ...item,
            image: 'assets/Icon/userIcon.png'
          }))
        }))
      );
    }

    createCompany(dto : CompanyCreateDto) : Observable<CompanyCreateDto> 
    {
        return this.http.post<CompanyCreateDto>(this.CreateCompanyUrl,dto);
    }
    getByIdCompany(Id : number) : Observable<CompanyDetailDto>{
      return this.http.get<CompanyDetailDto>(this.detailCompanyUrl + Id);
    }
    updateCompany(Id: number, dto : CompanyUpdateDto) : Observable<boolean>{
      return this.http.put<boolean>(this.updateCompanyUrl + Id  , dto);
    }
    deleteCompany(Id: number) : Observable<boolean>
    {
      return this.http.delete<boolean>(this.deleteCompanyUrl + Id);
    }
}
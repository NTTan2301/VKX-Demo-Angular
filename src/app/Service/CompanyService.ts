import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CompanyGridDto } from "./Dto/CompanyGridDto";
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class CompanyService{
    constructor(private http : HttpClient){

    }
    LstCompanyUrl = 'http://localhost:8000/api/Company';
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
}
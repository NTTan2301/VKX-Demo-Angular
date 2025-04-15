import { Routes } from '@angular/router';
import { ListCompanyComponent } from './Company/list/list.component';
import { CreateCompanyComponent } from './Company/create/create.component';
import { DetailCompanyComponent } from './Company/detail/detail.component';

export const routes: Routes = [
    {path: '',component:ListCompanyComponent},
    {path: 'company/create',component:CreateCompanyComponent},
    {path: 'company/detail/:id',component:DetailCompanyComponent},
];

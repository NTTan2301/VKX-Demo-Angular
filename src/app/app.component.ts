import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderLayoutComponent } from './Shared/header-layout/header-layout.component';
import { ListCompanyComponent } from './Company/list/list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderLayoutComponent,ListCompanyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'VKX_Demo_Angular';
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'detail-company',
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailCompanyComponent {
  
  id = '';
  constructor(private route : ActivatedRoute)
  {
    this.id = String(route.snapshot.paramMap.get('id'));
  }
}

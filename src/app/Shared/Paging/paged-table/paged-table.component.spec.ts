import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagedTableComponent } from './paged-table.component';

describe('PagedTableComponent', () => {
  let component: PagedTableComponent;
  let fixture: ComponentFixture<PagedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagedTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';
import { PagedResult } from '../PagedResult';
import { NgFor, NgIf, NgTemplateOutlet, CommonModule } from '@angular/common'; // ⬅️ Thêm CommonModule

@Component({
  selector: 'app-paged-table',
  standalone: true, // ⬅️ Cái này rất quan trọng nếu bạn dùng Angular 15+ standalone component
  imports: [CommonModule], // ✅ Chỉ cần import CommonModule, không cần liệt kê từng cái như NgFor, NgIf nữa
  templateUrl: './paged-table.component.html',
  styleUrl: './paged-table.component.css'
})
export class PagedTableComponent<T> {
  @Input() data!: PagedResult<T>;
  @Input() columns: { field: keyof T, header: string }[] = [];
  
  @ContentChild('actionTemplate', { static: false }) actionTemplate?: TemplateRef<any>;

  @Output() pageChange = new EventEmitter<number>();

  onPageChange(newPage: number) {
    this.pageChange.emit(newPage);
  }
}
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-uci-docente-paginator',
  imports: [PaginatorModule],
  template: `
    <div class="container-paginator">
      <p-paginator (onPageChange)="onPageChange($event)" [first]="first" [rows]="rows" [totalRecords]="totalRecords" [rowsPerPageOptions]="[1,10, 20, 30]"></p-paginator>
    </div>
  `,

  styles: `
    .container-paginator{
      width: 100%;
    }
  `
})
export class UciDocentePaginatorComponent {
  @Output() onPageChangeEvent = new EventEmitter();

  @Input() first = 0;
  @Input() rows = 0;
  @Input() totalRecords = 0;

  onPageChange(event: PaginatorState){
    this.onPageChangeEvent.emit(event);
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UciDocentePaginatorComponent } from './uci-docente-paginator.component';

describe('UciDocentePaginatorComponent', () => {
  let component: UciDocentePaginatorComponent;
  let fixture: ComponentFixture<UciDocentePaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UciDocentePaginatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UciDocentePaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

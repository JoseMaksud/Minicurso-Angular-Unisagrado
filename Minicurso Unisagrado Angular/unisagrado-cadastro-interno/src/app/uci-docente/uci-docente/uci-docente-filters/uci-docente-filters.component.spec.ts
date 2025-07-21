import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UciDocenteFiltersComponent } from './uci-docente-filters.component';

describe('UciDocenteFiltersComponent', () => {
  let component: UciDocenteFiltersComponent;
  let fixture: ComponentFixture<UciDocenteFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UciDocenteFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UciDocenteFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

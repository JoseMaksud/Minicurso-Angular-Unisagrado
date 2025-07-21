import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UciDocenteFormsComponent } from './uci-docente-forms.component';

describe('UciDocenteFormsComponent', () => {
  let component: UciDocenteFormsComponent;
  let fixture: ComponentFixture<UciDocenteFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UciDocenteFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UciDocenteFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

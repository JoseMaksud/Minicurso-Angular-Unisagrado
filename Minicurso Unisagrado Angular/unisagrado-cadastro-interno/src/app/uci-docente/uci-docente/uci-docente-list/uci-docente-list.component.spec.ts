import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UciDocenteListComponent } from './uci-docente-list.component';

describe('UciDocenteListComponent', () => {
  let component: UciDocenteListComponent;
  let fixture: ComponentFixture<UciDocenteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UciDocenteListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UciDocenteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

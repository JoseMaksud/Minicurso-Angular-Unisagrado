import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UciHomeComponent } from './uci-home.component';

describe('UciHomeComponent', () => {
  let component: UciHomeComponent;
  let fixture: ComponentFixture<UciHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UciHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UciHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

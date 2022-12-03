import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialUfvsComponent } from './historial-ufvs.component';

describe('HistorialUfvsComponent', () => {
  let component: HistorialUfvsComponent;
  let fixture: ComponentFixture<HistorialUfvsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialUfvsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialUfvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

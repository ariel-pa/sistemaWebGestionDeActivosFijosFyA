import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevalorizacionIndexComponent } from './revalorizacion-index.component';

describe('RevalorizacionIndexComponent', () => {
  let component: RevalorizacionIndexComponent;
  let fixture: ComponentFixture<RevalorizacionIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevalorizacionIndexComponent ]
    })
    .compileComponents(); 

    fixture = TestBed.createComponent(RevalorizacionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

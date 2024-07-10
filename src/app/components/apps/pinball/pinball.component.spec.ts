import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinballComponent } from './pinball.component';

describe('PinballComponent', () => {
  let component: PinballComponent;
  let fixture: ComponentFixture<PinballComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PinballComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PinballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

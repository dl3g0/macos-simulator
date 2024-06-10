import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XboxControllerComponent } from './xbox-controller.component';

describe('XboxControllerComponent', () => {
  let component: XboxControllerComponent;
  let fixture: ComponentFixture<XboxControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [XboxControllerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(XboxControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfieComponent } from './selfie.component';

describe('SelfieComponent', () => {
  let component: SelfieComponent;
  let fixture: ComponentFixture<SelfieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

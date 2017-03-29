import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreencapComponent } from './screencap.component';

describe('ScreencapComponent', () => {
  let component: ScreencapComponent;
  let fixture: ComponentFixture<ScreencapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreencapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreencapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

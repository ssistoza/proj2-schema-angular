import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwimlanesComponent } from './swimlanes.component';

describe('SwimlanesComponent', () => {
  let component: SwimlanesComponent;
  let fixture: ComponentFixture<SwimlanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwimlanesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwimlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

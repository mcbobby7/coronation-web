import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllGraphComponent } from './view-all-graph.component';

describe('ViewAllGraphComponent', () => {
  let component: ViewAllGraphComponent;
  let fixture: ComponentFixture<ViewAllGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

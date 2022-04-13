import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivHistoryComponent } from './div-history.component';

describe('DivHistoryComponent', () => {
  let component: DivHistoryComponent;
  let fixture: ComponentFixture<DivHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

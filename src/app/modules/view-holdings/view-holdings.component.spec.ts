import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHoldingsComponent } from './view-holdings.component';

describe('ViewHoldingsComponent', () => {
  let component: ViewHoldingsComponent;
  let fixture: ComponentFixture<ViewHoldingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHoldingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHoldingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

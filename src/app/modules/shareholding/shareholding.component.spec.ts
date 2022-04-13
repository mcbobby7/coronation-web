import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareholdingComponent } from './shareholding.component';

describe('ShareholdingComponent', () => {
  let component: ShareholdingComponent;
  let fixture: ComponentFixture<ShareholdingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareholdingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareholdingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

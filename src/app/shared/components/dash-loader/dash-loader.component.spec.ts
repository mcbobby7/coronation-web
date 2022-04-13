import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashLoaderComponent } from './dash-loader.component';

describe('DashLoaderComponent', () => {
  let component: DashLoaderComponent;
  let fixture: ComponentFixture<DashLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaModalComponent } from './mega-modal.component';

describe('MegaModalComponent', () => {
  let component: MegaModalComponent;
  let fixture: ComponentFixture<MegaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MegaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MegaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdLoginComponent } from './dd-login.component';

describe('DdLoginComponent', () => {
  let component: DdLoginComponent;
  let fixture: ComponentFixture<DdLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

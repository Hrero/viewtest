import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WechatLoginComponent } from './wechat-login.component';

describe('WechatLoginComponent', () => {
  let component: WechatLoginComponent;
  let fixture: ComponentFixture<WechatLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WechatLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WechatLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

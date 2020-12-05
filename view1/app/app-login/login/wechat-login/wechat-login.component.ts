import { Component, OnInit } from '@angular/core';
import {wxLogin} from '../../function/wechat';

@Component({
  selector: 'app-wechat-login',
  templateUrl: './wechat-login.component.html',
  styleUrls: ['./wechat-login.component.less']
})
export class WechatLoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      setTimeout(() => {
          wxLogin({
              self_redirect: true,
              id: 'J_ddLoginCode',
              appid: 'wx41ba12a6e5d354cb',
              scope: 'snsapi_login',
              redirect_uri: encodeURIComponent('https://m.zugeliang.com'),
              state: 'STATE',
              login_type: 'jssdk'
          });
      }, 50);
  }

}

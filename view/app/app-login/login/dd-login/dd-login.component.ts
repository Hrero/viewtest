import {Component, Input, OnInit} from '@angular/core';
import {ddLogin} from '../../function/dingtalk';

@Component({
    selector: 'app-dd-login',
    templateUrl: './dd-login.component.html',
    styleUrls: ['./dd-login.component.less']
})
export class DdLoginComponent implements OnInit {

    @Input() url;

    constructor() {
    }

    ngOnInit() {
        const handleMessage = (event) => {
            const origin = event.origin;
            if (origin === 'https://login.dingtalk.com') {
                const toUrl = 'https://oapi.dingtalk.com/connect/oauth2/sns_authorize?';
                const port = window.location.port;
                const str = port === '4066' ? 'ddlogin_dev_' : 'ddlogin_test_';
                const backTo =  encodeURIComponent('http://' + window.location.host + '/crm');
                const stateInfo = str + encodeURIComponent(window.location.host) + '_' + backTo;
                const urlParams = {
                    appid: 'dingoajpsbwz5cbd2qjrev',
                    response_type: 'code',
                    scope: 'snsapi_login',
                    // 测试的时候 请设置 state 为 test
                    state: stateInfo,
                    loginTmpCode: event.data,
                    redirect_uri: encodeURIComponent('https://admin.zugeliang.com/link'),
                };
                window.location.href = toUrl + Object.keys(urlParams).map(key => key + '=' + urlParams[key]).join('&');
            }
        };
        if (typeof window.addEventListener !== 'undefined') {
            window.addEventListener('message', handleMessage, false);
        }
        setTimeout(() => {
            const url = 'https://oapi.dingtalk.com/connect/oauth2/sns_authorize?';
            const params = {
                appid: 'dingoajpsbwz5cbd2qjrev',
                response_type: 'code',
                scope: 'snsapi_login',
                state: 'STATE',
                redirect_uri: encodeURIComponent('https://admin.zugeliang.com/link')
            };
            const arrString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
            ddLogin({
                id: 'J_ddLoginCode',
                // 线上
                goto: encodeURIComponent(url + arrString),
                style: 'border:none;background-color:#FFFFFF;',
                width: '280',
                height: '300'
            });
        }, 50);
    }

}

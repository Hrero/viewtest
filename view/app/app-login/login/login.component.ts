import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../ng-sevice/http.service';
import {REG_LIST} from '../../ng-data/regular-list';
import {StateService} from '../../ng-sevice/state.service';
import {LocalService} from '../../ng-sevice/local.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {Title} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';
import * as dd from 'dingtalk-jsapi';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
    public backUrl;

    constructor(
        private fb: FormBuilder,
        private https: HttpService,
        private state: StateService,
        private local: LocalService,
        private router: Router,
        private message: NzMessageService,
        private title: Title,
        private route: ActivatedRoute
    ) {
        title.setTitle(environment.production === false ? 'DEV-LOGIN-租葛亮OA' : '租葛亮Login');
    }

    ngOnInit(): void {
        this.backUrl = this.route.snapshot.queryParamMap.get('url');
        if (dd.env.platform !== 'notInDingTalk') {
            const url = 'https://oapi.dingtalk.com/connect/oauth2/sns_authorize' +
                '?redirect_uri=https%3A%2F%2Fadmin.zugeliang.com%2Flink' +
                '&appid=dingoajpsbwz5cbd2qjrev' +
                '&response_type=code' +
                '&scope=snsapi_auth' +
                '&state='
            const state = 'ddlogin_dev_'
                + encodeURIComponent(window.location.host)
                + '_'
                + encodeURIComponent( this.backUrl || 'http://' + window.location.host + '/crm')
            window.location.href = url + state;
        }
    }
}

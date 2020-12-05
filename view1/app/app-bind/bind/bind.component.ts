import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../ng-sevice/http.service';
import {StateService} from '../../ng-sevice/state.service';
import {LocalService} from '../../ng-sevice/local.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {REG_LIST} from '../../ng-data/regular-list';
import {environment} from '../../../environments/environment';
import {Title} from '@angular/platform-browser';
import * as dd from 'dingtalk-jsapi';

@Component({
    selector: 'app-bind',
    templateUrl: './bind.component.html',
    styleUrls: ['./bind.component.less']
})
export class BindComponent implements OnInit {

    public validateForm: FormGroup;
    public codeText: string;
    public disabledCode: boolean;
    public hasGetCode: boolean;
    public openId;
    public backUrl;
    private oldQrUrl;
    private timer;

    constructor(
        private fb: FormBuilder,
        private https: HttpService,
        private state: StateService,
        private local: LocalService,
        private router: Router,
        private message: NzMessageService,
        private route: ActivatedRoute,
        private modal: NzModalService,
        private title: Title
    ) {
        title.setTitle(environment.production === false ? 'DEV-BIND-租葛亮OA' : '租葛亮Bind');
    }

    toUrl(url: string) {
        if (url && url.indexOf('boss.') > -1) {
            window.location.href = 'https://admin.zugeliang.com/home';
        } else {
            if (dd.env.platform !== 'notInDingTalk') {
                dd.biz.navigation.replace({
                    url: decodeURIComponent(url)
                });
            } else {
                window.location.href = decodeURIComponent(url);
            }
        }
    }

    // 获取登录信息
    getLoginInfo() {
        this.message.success('登录成功！正在跳转。。。', {nzDuration: 500}).onClose.subscribe(
            () => {
                this.toUrl(this.backUrl || this.oldQrUrl || encodeURIComponent('http://salary.xiaozuge.net/home'));
            }
        );
    }

    getBindInfo(code) {
        if (!code) {
            this.message.error('非法登录！');
            return;
        }
        this.https.$get('/org/user/dingCodeLogin', 'CRMAPISERVER', {
            code: code
        }).subscribe(res => {
            if (res.success) {
                const result = res.data;
                if (result && Object.keys(result).length) {
                    this.local.setLoacl('userInfo', result);
                    this.local.setLoacl('token', result.accessToken);
                    this.local.setLoacl('username', result.name);
                    this.local.setLoacl('userId', result.id);
                    if(result.depts && result.depts[0]){
                        this.local.setLoacl('department', result.depts[0]);
                    }
                    this.message.success('登录成功！正在跳转。。。', {
                        nzDuration: 500
                    }).onClose.subscribe(
                        () => {
                            this.toUrl(this.backUrl || this.oldQrUrl || encodeURIComponent('http://salary.xiaozuge.net/salary'));
                        }
                    );
                }
            } else {
                this.modal.confirm({
                    nzTitle: '钉钉信息验证结果:',
                    nzContent: (res.message || '').substr(0, 150) + ',请点击确认，重新扫码！',
                    nzOnOk: () => {
                        window.location.href = 'http://' + window.location.host + '/login';
                    }
                });
            }
        });
    }

    errorBack(msg: string) {
        this.modal.confirm({
            nzTitle: '钉钉信息验证结果:',
            nzContent: decodeURIComponent(msg) + ',需要帮助请联系技术部！重新登录请点击确认',
            nzOnOk: () => {
                if (dd.env.platform !== 'notInDingTalk') {
                    dd.biz.navigation.replace({
                        url: decodeURIComponent('https://admin.zugeliang.com/toLink')
                    });
                } else {
                    window.location.href = 'http://' + window.location.host + '/login';
                }
            }
        });
    }

    ngOnInit() {
        const code = this.route.snapshot.queryParamMap.get('code');
        const token = this.route.snapshot.queryParamMap.get('token');
        const openid = this.route.snapshot.queryParamMap.get('openid');
        const msg = this.route.snapshot.queryParamMap.get('msg');
        this.backUrl = this.route.snapshot.queryParamMap.get('url');
        this.oldQrUrl = this.route.snapshot.queryParamMap.get('state');
        if (token) {
            this.local.setLoacl('token', decodeURIComponent(token));
            this.state.loginToken = decodeURIComponent(token);
            setTimeout(() => {
                this.getLoginInfo();
            }, 300);
            return;
        }
        if (openid || code) {
            this.openId = decodeURIComponent(openid);
            this.codeText = '获取验证码';
            this.validateForm = this.fb.group({
                phone: [null, [Validators.required, Validators.pattern(REG_LIST.phone)]],
                smsCode: [null, [Validators.required, Validators.maxLength(6), Validators.minLength(6)]]
            });
            if (code) {
                this.getBindInfo(code);
            }
            return;
        }
        if (msg) {
            this.errorBack(msg);
        }
    }
}

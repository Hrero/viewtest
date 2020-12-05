import { Injectable } from '@nestjs/common';
import { ApiService } from './common/service/api.service';

@Injectable()
export class AppService {
    constructor(private readonly api: ApiService) {}

    // 通过临时code获取钉钉信息，若已绑定钉钉信息 返回token 直接登录
    async getDingTalkUser(request, tmp_auth_code) {
        const res = await this.api.$get(request, {
            url: '/admin/get_userinfo_bycode',
            server: 'bossApiServer',
            query: {
                tmp_auth_code: tmp_auth_code,
            },
        }).toPromise();
        return res.data;
    }

    // 获取钉钉token，app为租葛亮钉钉管理后台 --》 租葛亮后台
    async getDingtalkToken() {
        const options = {
            url: 'https://oapi.dingtalk.com/gettoken',
            query: {
                appkey: 'dingr8oxhuzzpd67dchz',
                appsecret: 'iTa2W3_RKzMuYkKFCoO70lEukGFR3IiIOXz4dtFDISIYIf8PiKyqUd5DyrahfrXN',
            },
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = await this.api.$url(options).toPromise();
        return res.data;
    }

    // 根据用户的uid判断是否为租葛亮员工
    async getDingtalkContactType(access_token, unionid) {
        const res = await this.api.$url( {
            url: 'https://oapi.dingtalk.com/user/getUseridByUnionid',
            query: {
                access_token: access_token,
                unionid: unionid,
            },
            headers: {}
        }).toPromise();
        return res.data;
    }
}

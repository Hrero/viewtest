import { Controller, Get, Query, Res, Req, Body, Param, Post, Header, UsePipes, UseGuards, Redirect } from '@nestjs/common';
import { AppService } from '../app.service';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { ReadWriteService } from '../common/service/read-write.service';
import * as path from 'path';

@Controller()
export class AppController {
    
    constructor(
                private readonly appService: AppService,
                private rw: ReadWriteService,
                private readonly configService: ConfigService
    ) {
    }

    @Get('dd_login')
    @Redirect()
    async getLink(@Req() request: Request) {
        const query = request.query;
        const stateStr = query.state;
        // 判断正式环境和测试环境跳转
        if (stateStr === 'test' || stateStr === 'dev') {
            const hostStr = stateStr === 'dev' ? '127.0.0.1:6589' : 'salary.xiaozuge.net';
            return {
                url: 'http://' + hostStr + '/bind?url=' + encodeURIComponent('http://' + hostStr + '/home') + '&code=' + query.code,
                statusCode: 302,
            };
        }
        let redirectUrl = 'https://admin.zugeliang.com/bind?url=' + (stateStr || encodeURIComponent('https://admin.zugeliang.com/home'));
        // 请求租葛亮接口，获取openId和unionid 如果已绑定返回token直接登录
        if (!query.code) {
            return { url: redirectUrl + '&msg=' + encodeURIComponent('网页访问错误,请返回登录页重新扫码！'), statusCode: 302 };
        }
        const dingInfo = await this.appService.getDingTalkUser(request, query.code);
        if (dingInfo && dingInfo.code === 0) {
            const result = dingInfo.data.returnLoginVo;
            // 通过unionid校验是否租葛亮钉钉通讯录人员
            const dingUnionid = dingInfo.data.userInfo && dingInfo.data.userInfo.unionid;
            if (dingUnionid) {
                const dingToken = await this.appService.getDingtalkToken();
                if (dingToken.errcode === 0) {
                    const dingUser = await this.appService.getDingtalkContactType(dingToken.access_token, dingUnionid);
                    if (dingUser && (dingUser.contactType === 0 || dingUser.contactType === 1)) {
                        if (result && Object.keys(result).length) {
                            return { url: redirectUrl + '&token=' + encodeURIComponent(result.token), statusCode: 302 };
                        }
                        const openId = dingInfo.data.userInfo && dingInfo.data.userInfo.openid;
                        return { url: redirectUrl + '&openid=' + encodeURIComponent(openId), statusCode: 302 };
                    }
                    return { url: redirectUrl + '&msg=' + encodeURIComponent('非租葛亮员工，请勿登录！'), statusCode: 302 };
                }
                return { url: redirectUrl + '&msg=' + encodeURIComponent('获取钉钉信息失败！'), statusCode: 302 };
            }
            return { url: redirectUrl + '&msg=' + encodeURIComponent(dingInfo.msg), statusCode: 302 };
        }
    }
    @Get('api/userAddress')
    async userAddress() {
        return {
            code: 0,
            data: this.rw.readJson(path.resolve('./static/zgl-api-json/ng-china-area.json')),
            message: 'success',
            success: true
        };
    }
}

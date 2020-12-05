interface WechatType {
    id: string;
    appid: string;
    scope: string;
    redirect_uri: string;
    state: string;
    login_type: string;
    self_redirect: boolean;
    styletype?: string;
    sizetype?: string;
    bgcolor?: string;
    rst?: string;
}

export const wxLogin = (wechatInfo: WechatType) => {
    const wechatUrl = 'https://open.weixin.qq.com/connect/qrconnect?';
    const arrString = Object.keys(wechatInfo).map(key => key + '=' + encodeURIComponent(wechatInfo[key])).join('&');
    const d = document.createElement('iframe');
    d.src = wechatUrl + arrString;
    d.frameBorder = '0';
    d.scrolling = 'no';
    d.width = '320px';
    d.height = '350px';
    const f = document.getElementById(wechatInfo.id);
    f.innerHTML = '';
    f.appendChild(d);
};

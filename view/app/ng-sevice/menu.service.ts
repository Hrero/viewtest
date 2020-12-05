import { Injectable } from '@angular/core';
import { getFilteraArrayList, isEmpty } from 'zgl-utils-js';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

    public menuList: Array<any> = [];

    constructor(
    ) { }
    public arrId = [1,2,3,4,5,6,7,8,9,10,11,12,72,73]; // 菜单id
    public menu = []
    public commonMenu = [
        {
            "name": "首页",
            "url": "/crm/home",
            "icon": "home",
            "isOpen": true,
            "hidden": false,
            "id": "1",
            "child": []
        }
    ]
    public setUserMenuAll(data: Array<number>):Array<object> {
        const that = this;
        const host = window.location.host;
        const ids = getFilteraArrayList(this.arrId, data);
        // if (host.includes('127.0.0.1') || host.includes('10.33.31.7') || host.includes('localhost') ) {
        //     this.menuList = this.menu;
        // } else {
            (function getListForMenu(data: any, ids) {
                data.forEach(item => {
                    ids.forEach(cur => {
                        if (item.id == cur) {
                            item.hidden = true;
                        }
                        if (item.child && item.child.length > 0) {
                            getListForMenu(item.child, ids);
                        }
                    })
                })
                that.menuList = data;
            })(this.menu, ids)
        // }
        return [...this.commonMenu, ...that.menuList];
    }
}

import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { PowerService } from './power.service';
import { NzMessageService } from 'ng-zorro-antd';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MenuService } from './menu.service';
import { isEmpty } from 'zgl-utils-js';

@Injectable({
  providedIn: 'root'
})
export class JurisdictionService {

    constructor(
        private httpService: HttpService,
        private powerService: PowerService,
        private menuService: MenuService,
        private message: NzMessageService,
    ) { }

    private menuPermissionIdsSubject = new BehaviorSubject<any>(false);
    public getPowerList = this.menuPermissionIdsSubject.asObservable();

    // private userSystemSubject = new  BehaviorSubject<any>(false);
    // public getUserSystemInfo = this.userSystemSubject.asObservable();

    public routesList = [];
    public menuList = [];
    public backList = {};
    public menuPermissionIds = [];
    public isOpenPowerMenu = true;
    public setPowerList(): Observable<any>{
        if (!isEmpty(this.backList)) {
            return of(this.backList);
        }
        if (this.isOpenPowerMenu) {
            return of({ 
                menuList: this.menuService.setUserMenuAll([]),
                btnList: []
            })
        }
        return this.httpService.$get(this.powerService.getViewApiUrl({
            urlKey: 'userCurrent'
        }), 'CRMAPISERVER', {}).pipe(
            switchMap(res => {
                if (res.success) {
                    this.backList = {
                        menuList: this.menuService.setUserMenuAll(res.data.menuPermissionIds), // 菜单权限
                        btnList: res.data.normalPermissionIds // 功能权限
                    }
                    this.menuPermissionIdsSubject.next(this.backList);
                    return of(this.backList || [])
                }
            })
        );
    }
}

import { Injectable } from '@angular/core';
import { LocalService } from './local.service'
import { isEmpty } from 'zgl-utils-js';
import { HttpService } from './http.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PowerService } from '../ng-sevice/power.service'

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {

    constructor(
        private local: LocalService,
        private powerService: PowerService,
        private http: HttpService
    ) { }
    public departmentList: Array<any> = [];

    getDepartmentList(): Observable<any> {
        if (!isEmpty(this.departmentList)) {
            return of(this.departmentList)
        }
        return this.http.$post(this.powerService.getViewApiUrl({
            power: 1,
            urlKey: 'deptList'
        }), 'CRMAPISERVER', {}).pipe(
            switchMap(res => {
                if (res.success) {
                    this.departmentList = res?.data;
                } 
                return of(res.data || [])
            })
        );
    }

    getStaffList(id): Observable<any> {
        return this.http.$post(this.powerService.getViewApiUrl({
            power: 1,
            urlKey: 'orgDeptUsers'
        }), 'CRMAPISERVER',{
            deptId: id,
            pageSize: 1000
        }).pipe(
            switchMap(res => {
                if (res.success) {
                    return of(res.data || [])
                }
            })
        );
    }
}

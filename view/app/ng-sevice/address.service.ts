import { Injectable } from '@angular/core';
import { LocalService } from './local.service'
import { isEmpty } from 'zgl-utils-js';
import { HttpService } from './http.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AddressService {

    public position: Array<any>;

    constructor(
        private local: LocalService,
        private http: HttpService
    ) { }

    getAddress(): Observable<any> {
        if (this.position) {
            return of(this.position)
        }
        return this.http.$getInfo('/api/userAddress').pipe(
            switchMap(res => {
                if (res.code === 0) {
                    this.position = res.data
                }
                return of(this.position || [])
            })
        );
    }

}

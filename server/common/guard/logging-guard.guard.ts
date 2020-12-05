import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { ApiService } from '../service/api.service';
import { switchAll, switchMap } from 'rxjs/operators';

@Injectable()
export class LoggingGuardGuard implements CanActivate {
    constructor(private readonly api: ApiService) {}
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const token = req.headers['x-auth-token'] || req.headers['X-Auth-Token'] || '';
        const response = {
            code: 40004,
            data: null,
            msg: 'token is gone!',
        };
        if (token) {
            return this.api.$get(req, {
                url: '/admin/get_user_info_by_token',
                server: 'bossApiServer',
                headers: {
                    'X-Auth-Token': token
                }
            }).pipe(switchMap(result => {
                if(!result || !result.data) {
                    throw new HttpException({
                        code: 50000,
                        data: null,
                        msg: 'node is broken!',
                    }, HttpStatus.INTERNAL_SERVER_ERROR);
                    return of(false);
                }
                if (result.data && result.data.code === 40004) {
                    throw new HttpException(response, HttpStatus.OK);
                    return of(false);
                } else {
                    return of(true)
                }
            }));
        } else {
            throw new HttpException(response, HttpStatus.OK);
            return of(false);
        }
    }
}

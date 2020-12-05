import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AppPagesModule } from '../app-pages/app-pages.module'
const ROOT_ROUTER: Routes = [
    {
        path: '',
        redirectTo: '/crm/home/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'bind',
        loadChildren: () => import('../app-bind/app-bind.module').then(m => m.AppBindModule)
    },
    {
        path: 'login',
        loadChildren: () => import('../app-login/app-login.module').then(m => m.AppLoginModule)
    },
    {
        path: 'crm',
        loadChildren: () => import('../app-content/app-content.module').then(m => m.AppContentModule)
    },
    {
        path: 'pages',
        loadChildren: () => import('../app-pages/app-pages.module').then(m => m.AppPagesModule)
    },
    {
        path: '**',
        redirectTo: '/pages/404'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(ROOT_ROUTER)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

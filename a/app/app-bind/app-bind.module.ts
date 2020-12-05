import {NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import { BindComponent } from './bind/bind.component';
import {NzButtonModule, NzFormModule, NzIconModule, NzInputModule, NzMessageModule, NzModalModule, NzSpinModule} from 'ng-zorro-antd';

const routes: Routes = [
    { path: '', component: BindComponent }
];

@NgModule({
    declarations: [
        BindComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        NzFormModule,
        NzInputModule,
        NzButtonModule,
        NzIconModule,
        NzModalModule,
        NzSpinModule,
        NzMessageModule
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppBindModule {
}

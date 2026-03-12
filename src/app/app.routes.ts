import { Routes } from '@angular/router';
import { ClanSelectorComponent } from "./features/clan-selector/clan-selector.component";
import { ClanOverviewComponent } from './features/clan-overview/clan-overview.component';
import { TanksComponent } from './features/tanks/tanks.component';
import { AttendanceComponent } from './features/attendance/attendance.component';
import { MembersComponent } from './features/members/members.component';

export const routes: Routes = [
    {path: 'select-clan', component: ClanSelectorComponent},

    {path: 'clan', component: ClanOverviewComponent},
    {path: 'members', component: MembersComponent},
    {path: 'tanks', component: TanksComponent},
    {path: 'attendance', component: AttendanceComponent},
];

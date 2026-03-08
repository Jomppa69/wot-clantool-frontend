import { Routes } from '@angular/router';
import { ClanSelectorComponent } from "./features/clan-selector/clan-selector.component";
import { ClanOverviewComponent } from './features/clan-overview/clan-overview.component';

export const routes: Routes = [
    {path: 'select-clan', component: ClanSelectorComponent},

    {path: 'clan', component: ClanOverviewComponent},
];

import { Component } from '@angular/core';
import { MembersTableComponent } from "./members-table/members-table.component";

@Component({
    selector: 'app-members',
    standalone: true,
    imports: [MembersTableComponent],
    templateUrl: './members.component.html',
    styleUrl: './members.component.scss'
})

    export class MembersComponent {
  
}

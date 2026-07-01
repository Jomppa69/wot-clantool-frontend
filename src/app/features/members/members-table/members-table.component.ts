import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PlayerDetails } from '../../../shared/types/clan-types';
import { ClanService } from '../../../shared/services/clan.service';
import { DatePipe, NgStyle, DecimalPipe } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
    selector: 'members-table',
    standalone: true,
    imports: [MatTableModule, DatePipe, MatSortModule, NgStyle, DecimalPipe, ScrollingModule],
    templateUrl: './members-table.component.html',
    styleUrl: './members-table.component.scss'
})
export class MembersTableComponent implements OnInit, AfterViewInit {
    readonly clanservice = inject(ClanService);

    dataSource: MatTableDataSource<PlayerDetails> = new MatTableDataSource();
    columnsToDisplay: string[] = ['role', 'nickname', 'wn8', 'winrate', 'joined_at', 'days_in_clan'];

    @ViewChild(MatSort) sort!: MatSort;

    private roleHierarchy: Record<string, number> = {
        'commander': 1,
        'executive_officer': 2,
        'quartermaster': 3,
        'combat_officer': 4,
        'recruitment_officer': 5,
        'personnel_officer': 6,
        'junior_officer': 7,
        'private': 8,
        'recruit': 9,
        'reservist': 10
    };

    ngOnInit() {
        this.dataSource.sortingDataAccessor = (member, column) => {
            if (column === 'days_in_clan') return this.countDaysInClan(member.joined_at);
            if (column === 'role') return this.roleHierarchy[member.role];
            return (member as any)[column];
            };

        this.clanservice.members$.subscribe(members => {
            const membersMap = Object.values(members)
            this.dataSource.data = membersMap;
        });
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }


    countDaysInClan(joinedAt: number): number {
        const currentDate = new Date();
        const joinedDate = new Date(joinedAt * 1000);
        const timeDifference = currentDate.getTime() - joinedDate.getTime();
        const daysDifference = Math.round(timeDifference / (1000 * 3600 * 24));
        return daysDifference;
    }

    getWinrateColor(winrate: number) {
        return `var(--color-wr-${winrate.toFixed()})`;
    }

    getWn8Color(wn8: number) {
        const roundedWn8 = Math.round(wn8 / 200) * 200
        return `var(--color-wn8-${roundedWn8.toFixed()})`;
    }
}

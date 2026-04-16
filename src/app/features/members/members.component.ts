import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { ClanService } from '../../shared/services/clan.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ClanMember } from '../../shared/types/clan-types';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [MatTableModule, DatePipe, MatSortModule],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent implements OnInit, AfterViewInit {
  readonly clanservice = inject(ClanService);
  
  members: MatTableDataSource<ClanMember> = new MatTableDataSource();
  columnsToDisplay: string[] = ['role','account_name', 'joined_at', 'days_in_clan'];

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
    this.members.sortingDataAccessor = (member, column) => {
      if (column === 'days_in_clan') return this.countDaysInClan(member.joined_at);
      if (column === 'role') return this.roleHierarchy[member.role];
      return (member as any)[column];
    };
    this.clanservice.members$.subscribe(members => {
      this.members.data = members;
    });
  }

  ngAfterViewInit() {
    this.members.sort = this.sort;
  }


  countDaysInClan(joinedAt: number): number {
    const currentDate = new Date();
    const joinedDate = new Date(joinedAt);
    const timeDifference = currentDate.getTime() - joinedDate.getTime();
    const daysDifference = Math.round(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
  }


}

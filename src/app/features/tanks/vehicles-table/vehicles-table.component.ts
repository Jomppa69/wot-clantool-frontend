import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Tank, VehicleCategory, VehicleClanStatsMap } from '../../../shared/types/tank-types';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatSelect, MatOption } from "@angular/material/select";
import { NgStyle } from '@angular/common';
import { ScrollingModule } from "@angular/cdk/scrolling";

@Component({
    selector: 'vehicles-table',
    standalone: true,
    imports: [MatTableModule, MatSortModule, MatFormField, MatSelect, MatOption, NgStyle, ScrollingModule],
    templateUrl: './vehicles-table.component.html',
    styleUrl: './vehicles-table.component.scss'
})
export class VehiclesTableComponent implements OnInit, AfterViewInit {
    @Input() set vehicles(data: Tank[]) {
        this.dataSource.data = data;
    }
    dataSource = new MatTableDataSource<Tank>();

    @Input() title: string = ''
    @Input() categories: VehicleCategory[] = [];
    @Input() vehicleClanStats: VehicleClanStatsMap = {};

    @Output() categoryChange = new EventEmitter<{
        vehicle: Tank,
        categoryPriority: number | undefined;
    }>();

    columnsToDisplay: string[] = ['nation', 'icon', 'name', 'category', 'clan_wn8', 'clan_wr', 'clan_battles', 'clan_owners'];
    
    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit(): void {
        this.dataSource.sortingDataAccessor = (vehicle: Tank, column: string) => {
            if (column === 'clan_wn8') return this.vehicleClanStats[vehicle.tank_id]?.average_wn8 ?? 0;
            if (column === 'clan_wr') return this.vehicleClanStats[vehicle.tank_id]?.average_winrate ?? 0;
            if (column === 'clan_battles') return this.vehicleClanStats[vehicle.tank_id]?.average_battles ?? 0;
            if (column === 'clan_owners') return this.vehicleClanStats[vehicle.tank_id]?.total_owners ?? 0;
            return (vehicle as any)[column];
        };
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

    onCategoryChange(vehicle: Tank, categoryPriority: number | undefined) {
        this.categoryChange.emit( { vehicle, categoryPriority });
    }
    
    getWinrateColor(winrate: number) {
        return `var(--color-wr-${winrate.toFixed()})`;
    }

    getWn8Color(wn8: number) {
        const roundedWn8 = Math.round(wn8 / 200) * 200
        return `var(--color-wn8-${roundedWn8.toFixed()})`;
    }
}

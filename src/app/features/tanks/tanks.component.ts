import { Component, inject, OnInit } from '@angular/core';
import { TankService } from '../../shared/services/tank.service';
import { Tank, VehicleCategory, VehicleClanStatsMap } from '../../shared/types/tank-types';
import { MatIconModule } from '@angular/material/icon';
import { VehicleCategoryService } from '../../shared/services/category.service';
import { VehiclesTableComponent } from './vehicles-table/vehicles-table.component';

@Component({
    selector: 'app-tanks',
    standalone: true,
    imports: [MatIconModule, VehiclesTableComponent],
    templateUrl: './tanks.component.html',
    styleUrl: './tanks.component.scss'
})
export class TanksComponent implements OnInit {
    readonly tankService = inject(TankService);
    readonly vehicleCategoryService = inject(VehicleCategoryService)


    public vehicles: Record<string, Tank[]> = {} 
    public vehicleClanStats: VehicleClanStatsMap = {}
    public vehicleCategories: VehicleCategory[] = [];
    public vehiclesLoaded = false;

    ngOnInit(): void {
        this.vehicleCategoryService.vehicleCategories$.subscribe(categories => {
            this.vehicleCategories = categories;
        })
        this.tankService.vehicles$.subscribe(vehicles => {
            this.vehicles = vehicles;
            this.checkIfVehiclesLoaded();
        })

        this.tankService.vehicleClanStats$.subscribe(vehicleClanStats => {
            this.vehicleClanStats = vehicleClanStats;
            this.checkIfVehiclesLoaded();
        })
    }

    checkIfVehiclesLoaded() {
        if (Object.keys(this.vehicles).length !== 0 && Object.keys(this.vehicleClanStats).length !== 0) {
            this.vehiclesLoaded = true;
        }
    }

    deleteCategoryClick(category: VehicleCategory) {
        this.vehicleCategoryService.deleteCategory(category);
    }

    addCategoryClick() {
        this.vehicleCategoryService.openCategoryDialog();
    }

    setVehicleCategory(event: { vehicle: Tank, categoryPriority: number | undefined }) {
        this.vehicleCategoryService.setVehicleCategory(event.vehicle, event.categoryPriority);
    }
}

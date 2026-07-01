import { DestroyRef, inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Tank, VehicleCategory } from "../types/tank-types";
import { AddCategoryDialog } from "../../features/tanks/add-category-dialog/add-category-dialog";
import { MatDialog } from "@angular/material/dialog";
import { TankService } from "./tank.service";

const defaultCategories = [
    {
    "priority": 1,
    "name": "Must have",
    "vehicles": []
    },
    {
        priority: 2,
        name: 'Good to have',
        vehicles: []
    },
    {
        priority: 3,
        name: 'Viable',
        vehicles: []
    },
]

@Injectable({
    providedIn: 'root'
})

export class VehicleCategoryService {
    private readonly destroyRef = inject(DestroyRef);
    private readonly dialog = inject(MatDialog);
    private readonly vehicleService = inject(TankService);

    vehicleCategories$ = new BehaviorSubject<VehicleCategory[]>([]);

    constructor() {
        if(this.vehicleCategories$.value.length === 0) {
            this.vehicleCategories$.next(defaultCategories);
        } else {
            // TODO: This is probably unnecessary and should be deleted. Lets see after I implement saving categories to backend and stuff.
            const sorted = this.vehicleCategories$.value.sort((a, b) => a.priority - b.priority);
            this.vehicleCategories$.next(sorted);
        }
    }


    openCategoryDialog():void {
        const dialogRef = this.dialog.open(AddCategoryDialog, {
            data: { vehicleCategories: this.vehicleCategories$.value },
            backdropClass: 'backdropBackground'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.addCategory(result);
            }
        })
    }

    addCategory(newCategory: { name: string, priority: number }) {
        const current = this.vehicleCategories$.value;
        const exists = current.some(category => category.priority === newCategory.priority);

        if (exists) {
            return;
        }
        
        const updated = [...current, { vehicles: [], ...newCategory}]
            .sort((a, b) => a.priority - b.priority)
        
        this.vehicleCategories$.next(updated);
    }

    deleteCategory(categoryToDelete: VehicleCategory) {
        const updated = this.vehicleCategories$.value.filter(
            category => category !== categoryToDelete
        )
        for (const vehicle of categoryToDelete.vehicles) {
            this.setVehicleCategory(vehicle, undefined);
        }

        this.vehicleCategories$.next(updated);
    }

    setVehicleCategory(vehicle: Tank, categoryPriority: number | undefined ) {
        // Check if vehicle has an category set before and remove it from old category.
        let oldCategory: VehicleCategory | undefined;
        if (vehicle.priority) {
            oldCategory  = this.vehicleCategories$.value.find((category) => category.priority === vehicle.priority)
            if(oldCategory) {
                oldCategory.vehicles = oldCategory.vehicles.filter((oldVehicle) => oldVehicle.tank_id !== vehicle.tank_id);
            }
        }

        // Set new priority
        const newCategory = this.vehicleCategories$.value.find((category) => category.priority === categoryPriority);
        if (newCategory) {
            newCategory.vehicles.push(vehicle);
        }
        vehicle.priority = categoryPriority;

        const updatedCategories = this.vehicleCategories$.value.map((category) => {
            if (newCategory && category.priority === newCategory.priority) {
                return newCategory;
            }
            if (oldCategory && category.priority === oldCategory.priority) {
                return oldCategory;
            }
            return category;
        });
        this.vehicleCategories$.next(updatedCategories);
        this.vehicleService.updateVehicle(vehicle);
    }
}
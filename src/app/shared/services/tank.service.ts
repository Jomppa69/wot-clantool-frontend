import { DestroyRef, inject, Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, filter } from "rxjs";
import { TankApiService } from "./tank-api.service";
import { Tank, VehicleClanStats, VehicleClanStatsMap } from "../types/tank-types";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ClanService } from "./clan.service";
import { PlayerDetailsMap } from "../types/clan-types";

@Injectable({
    providedIn: 'root'
})

export class TankService {
    private readonly tankApiService = inject(TankApiService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly clanService = inject(ClanService);

    vehicles$ = new BehaviorSubject<Record<string, Tank[]>>({});
    vehicleClanStats$ = new BehaviorSubject<VehicleClanStatsMap>({});

    members: PlayerDetailsMap = {};

    constructor() {
        console.log('tankservice has started!');

        this.tankApiService
            .getTanks('10')
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (tanks: Record<string, Tank[]>) => {
                    this.vehicles$.next(tanks);
                },
                error: () => {
                    // Implement some type of error handling or smth.
                    console.log('Error fetching tanks');
                }
        })

        combineLatest([
            this.vehicles$,
            this.clanService.members$
        ]).pipe(
            filter(([vehicles, members]) => 
                Object.keys(vehicles).length > 0 && Object.keys(members).length > 0
            ),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe(([_, members]) => {
            this.members = members;
            this.calculateClanVehicleStats()
        })
    }

    // TODO: Make this better at some point or smth
    updateVehicles(vehicles: Record<string, Tank[]>) {
        for (const type of Object.keys(vehicles)) {
            vehicles[type].sort((a, b) => a.nation.localeCompare(b.nation));
        }
        this.vehicles$.next(vehicles);
    }

    updateVehicle(updatedVehicle: Tank) {
        const vehicles = this.vehicles$.value;
        vehicles[updatedVehicle.type] = vehicles[updatedVehicle.type].filter((vehicle) => vehicle.tank_id !== updatedVehicle.tank_id);
        vehicles[updatedVehicle.type].push(updatedVehicle);
        vehicles[updatedVehicle.type].sort((a, b) => a.nation.localeCompare(b.nation));
        this.vehicles$.next(vehicles);
    }

    private calculateClanVehicleStats() {
        const vehicleClanStats: VehicleClanStatsMap = {};
        const vehiclesArray = Object.values(this.vehicles$.value).flat();

        for (const vehicle of Object.values(vehiclesArray)) {
            const id = vehicle.tank_id;

            const vehicleTotals = Object.values(this.members).reduce((vehicleTotals, member) => {
                if (member.vehicle_stats[id]) {
                    vehicleTotals.wn8 += member.vehicle_stats[id].wn8;
                    vehicleTotals.winrate += member.vehicle_stats[id].winrate;
                    vehicleTotals.battles += member.vehicle_stats[id].battles;
                    vehicleTotals.owners += 1;
                }
                return vehicleTotals;
            }, { wn8: 0, winrate: 0, battles: 0, owners: 0 })


            // If no one in the clan has battles in the vehicle, we remove it from the list of vehicles, since it is irrelevant for the clan.
            if (vehicleTotals.battles === 0) {
                const vehicles = this.vehicles$.value;
                const vehicleClass = Object.keys(vehicles).find(key => vehicles[key].includes(vehicle));
                if (vehicleClass) {
                    vehicles[vehicleClass] = vehicles[vehicleClass].filter(v => v.tank_id !== id);
                    // This may call unnecessary recalls of calculateClanVehicleStats, packaking removal of 0 battle vehicles to one call might be worth it.
                    this.vehicles$.next(vehicles);
                }
                continue;   
            }

            const vehicleStats: VehicleClanStats = {
                average_wn8: parseFloat((vehicleTotals.wn8 / vehicleTotals.owners).toFixed(2)),
                average_winrate: parseFloat((vehicleTotals.winrate / vehicleTotals.owners).toFixed(2)),
                average_battles: parseFloat((vehicleTotals.battles  / vehicleTotals.owners).toFixed(2)),
                total_owners: vehicleTotals.owners
            };

            vehicleClanStats[id] = vehicleStats;
        }
        this.vehicleClanStats$.next(vehicleClanStats)
    }
}
export interface Tank {
    name: string;
    short_name: string;
    nation: string;
    tier: number;
    type: string;
    images: {
        small_icon: string;
        contour_icon: string;
        big_icon: string;
    };
    tank_id: number;
    priority?: number;
}

export interface VehicleCategory {
    priority: number;
    name: string;
    vehicles: Tank[];
}

export interface VehicleClanStats {
    average_wn8: number;
    average_winrate: number;
    average_battles: number;
    total_owners: number;
}

export type VehicleClanStatsMap = Record<string, VehicleClanStats>;

export type TankMap = Record<string, Tank>;

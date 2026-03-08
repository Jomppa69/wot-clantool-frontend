export interface Tank {
    name: string;
    nation: string;
    tier: number;
    type: string;
}

export type TankMap = Record<string, Tank>;

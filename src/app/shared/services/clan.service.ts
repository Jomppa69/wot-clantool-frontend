import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Clan, ClanSearchResult } from "../types/clan-types";
import { ClanApiService } from "./clan-api.service";

@Injectable({
    providedIn: 'root'
})

export class ClanService {
    private readonly clanApiService = inject(ClanApiService);

    clan$ = new BehaviorSubject<Clan | null>(null);

    constructor() {
        // debug
        this.getClan(500161363).subscribe({
            next: (response) => {
                this.updateClan(response);
                console.log(response)
            }
        })
    }

    updateClan(clan: Clan) {
        this.clan$.next(clan);
    }

    searchClan(clanName: string) {
        return this.clanApiService.searchClan(clanName);
    }

    getClan(clanId: number) {
        return this.clanApiService.getClan(clanId);
    }
}
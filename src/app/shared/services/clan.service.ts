import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Clan, ClanMember, ClanSearchResult } from "../types/clan-types";
import { ClanApiService } from "./clan-api.service";

@Injectable({
    providedIn: 'root'
})

export class ClanService {
    private readonly clanApiService = inject(ClanApiService);

    clan$ = new BehaviorSubject<Clan | null>(null);
    members$ = new BehaviorSubject<ClanMember[]>([]);

    constructor() {
        // debug
        this.clanApiService.fetchClanDetails(500161363).subscribe({
            next: (response) => {
                this.setClan(response.clan_id);
                console.log(response)
            }
        })
    }

    setClan(clanId: number) {
        this.clanApiService.fetchClanDetails(clanId).subscribe({
            next: (response) => {
                this.clan$.next(response)
                this.setMembers(clanId)
            }
        })
    }
    
    setMembers(clanId: number) {
        this.clanApiService.fetchClanMembers(clanId).subscribe({
            next: (response) => {
                this.members$.next(response)
            }
        })
    }

    queryClans(clanName: string) {
        return this.clanApiService.queryClansByName(clanName);
    }
}
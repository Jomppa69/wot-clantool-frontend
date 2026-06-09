import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, forkJoin } from "rxjs";
import { Clan, PlayerClanDetails, PlayerDetailsMap } from "../types/clan-types";
import { ClanApiService } from "./clan-api.service";

@Injectable({
    providedIn: 'root'
})

export class ClanService {
    private readonly clanApiService = inject(ClanApiService);

    clan$ = new BehaviorSubject<Clan | null>(null);
    members$ = new BehaviorSubject<PlayerDetailsMap>({});

    constructor() {
        // debug
        this.clanApiService.fetchClanDetails(500161363).subscribe({
            next: (response) => {
                this.setClan(response.clan_id);
            }
        })
    }

    setClan(clanId: number) {
        this.clanApiService.fetchClanDetails(clanId).subscribe({
            next: (clan) => {
                this.clan$.next(clan)
            }
        });

        // Start loading of full clan member details.
        this.setMembers(clanId);
    }

    getMembers(clanId: number) {
        return this.clanApiService.fetchClanMembers(clanId);
    }

    queryClans(clanName: string) {
        return this.clanApiService.queryClansByName(clanName);
    }

    setMembers(clanId: number) {
        this.clanApiService.fetchClanMemberDetails(clanId).subscribe({
            next: (membersMap) => {
                this.members$.next(membersMap)
            }
        })
    }
}
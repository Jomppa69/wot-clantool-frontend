import { DestroyRef, inject, Injectable } from "@angular/core";
import { BehaviorSubject, } from "rxjs";
import { Clan, PlayerDetailsMap } from "../types/clan-types";
import { ClanApiService } from "./clan-api.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable({
    providedIn: 'root'
})

export class ClanService {
    private readonly clanApiService = inject(ClanApiService);
    private readonly destroyRef = inject(DestroyRef);

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
        this.clanApiService
            .fetchClanDetails(clanId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (clan) => {
                    this.clan$.next(clan)
                },
                error: () => {
                    console.log('Error fetching clan details')
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
        this.clanApiService
            .fetchClanMemberDetails(clanId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (membersMap) => {
                this.members$.next(membersMap)
            },
            error: () => {
                console.log('Error fetcing clan member details')
            }
        })
    }
}
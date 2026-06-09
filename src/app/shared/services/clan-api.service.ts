import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { getEndpoints } from "../../core/constants/endpoints.constants";
import { Clan, PlayerClanDetails, ClanSearchResult, PlayerDetailsMap } from "../types/clan-types";


@Injectable({
    providedIn: 'root'
})

export class ClanApiService {
    private readonly endpoints = getEndpoints();
    private readonly http = inject(HttpClient);

    queryClansByName(clanName: string) {
        return this.http.get<ClanSearchResult[]>(this.endpoints.clan.search(), {
            params: new HttpParams().set('name', clanName),
        })
    }

    fetchClanDetails(clanId: number) {
        return this.http.get<Clan>(this.endpoints.clan.details(clanId), {
        })
    }

    fetchClanMembers(clanId: number) {
        return this.http.get<PlayerClanDetails[]>(this.endpoints.clan.members(clanId), {
        })
    }

    fetchClanMemberDetails(clanId: number) {
        return this.http.get<PlayerDetailsMap>(this.endpoints.clan.memberDetails(clanId), {})
    }
}
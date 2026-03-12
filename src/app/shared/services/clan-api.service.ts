import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { getEndpoints } from "../../core/constants/endpoints.constants";
import { Clan, ClanMember, ClanSearchResult } from "../types/clan-types";


@Injectable({
    providedIn: 'root'
})

export class ClanApiService {
    private readonly endpoints = getEndpoints();
    private readonly http = inject(HttpClient);

    queryClansByName(clanName: string) {
        return this.http.get<ClanSearchResult[]>(this.endpoints.clan.search(clanName), {
            params: new HttpParams().set('name', clanName),
        })
    }

    fetchClanDetails(clanId: number) {
        return this.http.get<Clan>(this.endpoints.clan.details(clanId), {
        })
    }

    fetchClanMembers(clanId: number) {
        return this.http.get<ClanMember[]>(this.endpoints.clan.members(clanId), {
        })
    }
}
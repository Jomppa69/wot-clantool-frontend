import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { getEndpoints } from "../../core/constants/endpoints.constants";
import { Tank } from "../types/tank-types";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class TankApiService {
    private readonly endpoints = getEndpoints();
    private readonly http = inject(HttpClient);

    getTanks(tier: string): Observable<Record<string, Tank[]>> {
        return this.http.get<Record<string, Tank[]>>(this.endpoints.tank.tanks(tier), {
            params: new HttpParams().set('tier', tier),
        })
    }
}
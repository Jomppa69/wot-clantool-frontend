import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TankApiService } from "./tank-api.service";
import { Tank } from "../types/tank-types";

@Injectable({
    providedIn: 'root'
})

export class TanksService {
    private readonly tankApiService = inject(TankApiService);

    tanks$ = new BehaviorSubject<Tank[]>([]);
}
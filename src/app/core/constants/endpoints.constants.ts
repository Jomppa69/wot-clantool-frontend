import { inject } from "@angular/core";
import { ENVIRONMENT, Environment } from "../tokens/environment.token";


const getClanEndpoints = (baseUrl: string) => ({
    search: (clanName: string) => `${baseUrl}clans`,
    members: (clanId: number) => `${baseUrl}clans/${clanId}/members`,
    details: (clanId: number) => `${baseUrl}clans/${clanId}`
})

const getTankEndpoints = (baseUrl: string) => ({
    tanks: (tier: string) => `${baseUrl}tanks?tier=${tier}`,
})

export const getEndpoints = () => {
    const environment = inject<Environment>(ENVIRONMENT);
    return {
        clan: getClanEndpoints(environment.apiBaseUrl),
        tank: getTankEndpoints(environment.apiBaseUrl)
    }
};
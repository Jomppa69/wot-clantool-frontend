import { inject } from "@angular/core";
import { ENVIRONMENT, Environment } from "../tokens/environment.token";


const getClanEndpoints = (baseUrl: string) => ({
    search: (clanName: string) => `${baseUrl}clan/search`,
    members: (clanId: number) => `${baseUrl}clan/members`,
    details: (clanId: number) => `${baseUrl}clan/details`
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
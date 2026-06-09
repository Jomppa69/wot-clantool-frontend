import { inject } from "@angular/core";
import { ENVIRONMENT, Environment } from "../tokens/environment.token";


const getClanEndpoints = (baseUrl: string) => ({
    search: () => `${baseUrl}/clan`,
    members: (clanId: number) => `${baseUrl}/clan/${clanId}/members`,
    details: (clanId: number) => `${baseUrl}/clan/${clanId}`,
    memberDetails: (clanId: number) => `${baseUrl}/clan/${clanId}/members/details`
})

const getTankEndpoints = (baseUrl: string) => ({
    tanks: (tier: string) => `${baseUrl}/tanks?tier=${tier}`,
})

const getPlayerEndpoints = (baseUrl: string) => ({
    player: (playerId: number) => `${baseUrl}/player/${playerId}`,
    vehicles: (playerId: number) => `${baseUrl}/player/${playerId}/vehicles`,
    vehicleDetails: (playerId: number) => `${baseUrl}/player/${playerId}/vehicles/details`

})

export const getEndpoints = () => {
    const environment = inject<Environment>(ENVIRONMENT);
    return {
        clan: getClanEndpoints(environment.apiBaseUrl),
        tank: getTankEndpoints(environment.apiBaseUrl),
        player: getPlayerEndpoints(environment.apiBaseUrl),
    }
};
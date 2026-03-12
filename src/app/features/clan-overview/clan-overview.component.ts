import { Component, inject } from '@angular/core';
import { ClanService } from '../../shared/services/clan.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-clan-overview',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './clan-overview.component.html',
  styleUrl: './clan-overview.component.scss'
})
export class ClanOverviewComponent {
  private readonly clanService = inject(ClanService);
  clan$ = this.clanService.clan$;

  getClanRating() {
    // Implement this to backend and api
  }
}

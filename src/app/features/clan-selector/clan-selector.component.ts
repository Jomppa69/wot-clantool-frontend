import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Clan, ClanSearchResult } from '../../shared/types/clan-types';
import { Router } from '@angular/router';
import { ClanService } from '../../shared/services/clan.service';

@Component({
  selector: 'clan-selector',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './clan-selector.component.html',
  styleUrl: './clan-selector.component.scss'
})
export class ClanSelectorComponent {
    private readonly clanService = inject(ClanService);
    private readonly router = inject(Router);

    private clanId: number = 0;

    clanName = new FormControl('');
    results: ClanSearchResult[] = [];

    ngOnInit() {
        // Debug
        this.clanName.setValue('dhta');
        this.searchClan();
    }

    searchClan() {
        if (this.clanName.value !== '' && this.clanName.value !== null) {
            this.clanService.searchClan(this.clanName.value).subscribe({
                next: (response) => {
                    console.log('searchClan response', response)
                    this.results = response;
                },
                error: (error) => console.error('searchClan error', error)
            })
        }
    }

    selectClan(clan: ClanSearchResult) {
        this.clanService.getClan(clan.clan_id).subscribe({
            next: (response) => {
                this.clanService.updateClan(response);
                console.log(response);
                this.router.navigate(['/clan']);
            }
        })
    }
}

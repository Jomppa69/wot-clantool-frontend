import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ClanService } from '../services/clan.service';

@Component({
  selector: 'header',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
    private readonly router = inject(Router);
    readonly clanService = inject(ClanService);

    navTo(path: string) {
        switch (path) {
            case 'select-clan':
                this.router.navigate(['/select-clan']);
                break;
            case 'clan':
                this.router.navigate(['/clan']);
                break;
            case 'members':
                this.router.navigate(['/members']);
                break;
            case 'tanks':
                this.router.navigate(['/tanks']);
                break;
            case 'attendance':
                this.router.navigate(['/attendance']);
                break;
        }
    }
}

import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
    router = inject(Router);
    clanId: number = 0;

    // ngOnInit() {
    //     const storedClanId = Number(localStorage.getItem('clanId'));
    //     if (storedClanId) {
    //         this.clanId = storedClanId;
    //     } else {
    //         this.router.navigate(['/select-clan']);
    //     }
    // }
}

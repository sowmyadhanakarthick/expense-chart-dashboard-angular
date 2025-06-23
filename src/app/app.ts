import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { Toast } from '../app/components/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, Toast],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'expense-chart-dashboard-angular';
  protected router = inject(Router);
}

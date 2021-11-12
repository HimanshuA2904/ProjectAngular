import { Component } from '@angular/core';
import { PrintService } from './sales/print.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Inventory';
  loginStatus = false;
  constructor(private printService:PrintService){}
}

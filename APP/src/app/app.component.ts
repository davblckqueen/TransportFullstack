import { Component, ViewChild } from '@angular/core';
import {ListComponent} from './list/list.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(ListComponent) list: ListComponent | undefined;
  title = 'APP';

  onRefreshList(event: any) {
    // @ts-ignore
    this.list.getQuotations();
  }
}

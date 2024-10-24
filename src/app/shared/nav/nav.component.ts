import { Component, OnInit } from '@angular/core';
import { faHome, faStore, faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  faUser = faUser;
  faStore = faStore;
  faHome = faHome;
  constructor() { }

  isCollapsed = true;

  ngOnInit() {
  }


}

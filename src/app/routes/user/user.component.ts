import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  isLoading: boolean;
  // loading spinner
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  constructor(userService: UserService) {
    this.reset();
  }

  ngOnInit(): void {
    this.subscribeToEvents();
  }

  /**
   * reset
   */
  private reset() {

  }


  private subscribeToEvents() {

  }

}

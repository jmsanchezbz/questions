import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(private userService: UserService) {}

  isAuthenticated():boolean { 
    return this.userService.isAuthenticated();
  }
  
  logout():void {
    console.log('Menu logout');
    this.userService.logOut();
  }
}

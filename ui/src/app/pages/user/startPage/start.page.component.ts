import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../services/auth.service';
import {Router} from '@angular/router';
import {StoreService} from '../../../../services/store.service';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './start.page.component.html',
  styleUrls: ['./start.page.component.css']
})
export class StartPageComponent implements OnInit {
  private id: number;
  client: any;

  constructor(private router: Router,
              private authService: AuthService,
              private storeService: StoreService,
              private userService: UserService) {
    this.id = this.storeService.getId();
    this.userService.getById(this.id).subscribe(
      data => {
        if (data.body) {
          this.client = data.body;
        } else {
          alert(data.message);
        }
      }, error => alert(error)
    );
  }

  ngOnInit() {
  }

  signOut() {
    this.authService.signOut(this.client.id, this.client.personType)
      .subscribe(() => this.router.navigateByUrl('/'));
  }
}

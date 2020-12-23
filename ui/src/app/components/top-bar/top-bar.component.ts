import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {StoreService} from '../../../services/store.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit , OnDestroy {
  public isAuthenticated: boolean;
  private authChangedSubscriber: Subscription;
  personType: string;

  constructor(private router: Router, private storeService: StoreService) {
  }

  ngOnInit(): void {
    this.authChangedSubscriber = this.storeService.authChanged.asObservable().subscribe(
      x => {
        this.isAuthenticated = x;
        if (this.isAuthenticated) {
          this.personType = this.storeService.getPersonType();
        }
      }
    );
  }

  ngOnDestroy(): void {
  }

  logOut() {
    this.personType = undefined;
    this.storeService.setIsAuth(false);
    return this.router.navigateByUrl('/sign-in');
  }

  home() {
    return this.router.navigateByUrl('/startPage');
  }

  test() {
    return this.router.navigateByUrl('/profile');
  }

  signIn() {
    return this.router.navigateByUrl('/sign-in');
  }

  signUp() {
    return this.router.navigateByUrl('/sign-up');
  }
}

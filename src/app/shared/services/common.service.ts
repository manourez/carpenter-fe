import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommonService {
  private data = new BehaviorSubject(false);
  private logout = new BehaviorSubject(false);

  data$ = this.data.asObservable();
  logout$ = this.data.asObservable();

  changeData(data: boolean) {
    this.data.next(data);
  }

  logoutClicked(data: boolean) {
    this.logout.next(data);
  }
}

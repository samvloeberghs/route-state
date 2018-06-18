import { Component, OnInit } from '@angular/core';
import { ItemsService } from './items.service';
import { StateService } from './state.service';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'e1-a',
  templateUrl: './a.component.html',
  styles: []
})
export class AComponent implements OnInit {

  constructor(public itemsService: ItemsService,
              private stateService: StateService,
              private router: Router) {
  }

  ngOnInit() {
    this.stateService.currentItemState$
      .pipe(
        filter(_ => !!_),
        distinctUntilChanged((a, b) => a.url === b.url)
      )
      .subscribe((currentItemState) => {
        if (currentItemState.url) {
          this.router.navigateByUrl(currentItemState.url);
        }
      });
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { SetItemOneFormStateAction } from '../item/item.actions';
import { distinctUntilChanged, filter, map, take } from 'rxjs/operators';
import { Item } from '../item/item.model';

@Component({
  selector: 'e1-one',
  templateUrl: './one.component.html',
  styles: []
})
export class OneComponent implements OnInit, OnDestroy {

  oneForm: FormGroup;
  oneFormSubmitted = false;

  private subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
              private store: Store) {

  }

  ngOnInit() {

    this.oneForm = this.formBuilder.group({
        email: ['', Validators.compose([
          Validators.required,
          Validators.email]
        )]
      }
    );

    this.subscriptions.push(
      this.store.select(state => state.a).pipe(
        distinctUntilChanged((a, b) => a.currentId === b.currentId),
        map(state => {
          return state.items.find((item: Item) => {
            return item.id === state.currentId;
          });
        })
      ).subscribe(item => {
        if (item && item.oneForm) {
          this.oneForm.setValue(item.oneForm.data, { emitEvent: false });
          this.oneForm.updateValueAndValidity({ emitEvent: false });
          this.oneFormSubmitted = item.oneForm.submitted;
        } else {
          this.oneFormSubmitted = false;
          this.oneForm.reset({ emitEvent: false });
        }
      })
    );

    this.subscriptions.push(
      combineLatest(
        this.store.select(state => state.a).pipe(
          distinctUntilChanged((a, b) => a.currentId === b.currentId),
          take(1)
        ),
        this.oneForm.valueChanges
      ).subscribe(([state, currentOneFormState]) => {
        this.store.dispatch(new SetItemOneFormStateAction({
          id: state.currentId,
          item: {
            oneForm: {
              data: currentOneFormState,
              submitted: this.oneFormSubmitted
            }
          }
        }));

      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  submitOneForm($event: any) {

    this.oneFormSubmitted = true;
    const raw: any = this.oneForm.getRawValue();

    if (this.oneForm.valid) {
      // do stuff when valid
    }

    this.store.select(state => state.a).pipe(
      take(1)
    ).subscribe(state => {
      this.store.dispatch(new SetItemOneFormStateAction({
        id: state.currentId,
        item: {
          oneForm: {
            data: raw,
            submitted: this.oneFormSubmitted
          }
        }
      }));
    });

    $event.preventDefault();

  }

}

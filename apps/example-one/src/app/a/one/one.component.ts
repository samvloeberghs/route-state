import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../state.service';
import { ItemsService } from '../items.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Subscription } from 'rxjs';

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
              private itemsService: ItemsService,
              private activatedRoute: ActivatedRoute,
              private stateService: StateService) {

  }

  ngOnInit() {

    this.oneForm = this.formBuilder.group({
        email: ['', Validators.compose([
          Validators.required,
          Validators.email]
        )]
      }
    );

    this.subscriptions.push(this.stateService.currentItemState$.subscribe(state => {
      if (state && state.oneForm) {
        this.oneForm.setValue(state.oneForm.data, { emitEvent: false });
        this.oneForm.updateValueAndValidity({ emitEvent: false });
        this.oneFormSubmitted = state.oneForm.submitted;
      } else {
        this.oneFormSubmitted = false;
        this.oneForm.reset();
      }
    }));

    this.subscriptions.push(this.oneForm.valueChanges.subscribe((currentOneFormState) => {
      this.stateService.setItemState(this.stateService.currentItemId, {
        oneForm: {
          data: currentOneFormState,
          submitted: this.oneFormSubmitted
        }
      });
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

    this.stateService.setItemState(this.stateService.currentItemId, {
      oneForm: {
        data: raw,
        submitted: this.oneFormSubmitted
      }
    });

    $event.preventDefault();

  }

}

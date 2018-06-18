import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {

    this.oneForm = this.formBuilder.group({
        email: ['', Validators.compose([
          Validators.required,
          Validators.email]
        )]
      }
    );
    // todo: cleanup subscription
    this.subscriptions.push(this.oneForm.valueChanges.subscribe((_) => {
      console.log(_);
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

    $event.preventDefault();

  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'e1-journal',
  templateUrl: './journal.component.html',
  styles: []
})
export class JournalComponent implements OnInit, OnDestroy {

  journalForm: FormGroup;
  journalFormSubmitted = false;

  private subscriptions: Subscription[] = [];

  constructor(private readonly formBuilder: FormBuilder) {

  }

  ngOnInit() {

    this.journalForm = this.formBuilder.group({
        email: ['', Validators.compose([
          Validators.required,
          Validators.email]
        )]
      }
    );

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  submitJournalForm($event: any) {

    this.journalFormSubmitted = true;
    const raw: any = this.journalForm.getRawValue();

    if (this.journalForm.valid) {
      // do stuff when valid
      console.log('valid', raw);
    } else {
      console.log('invalid', raw);
    }

    $event.preventDefault();

  }

}

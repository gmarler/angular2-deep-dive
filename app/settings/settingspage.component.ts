import {Component, OnInit} from '@angular/core';
import {FORM_PROVIDERS, FORM_DIRECTIVES, FormBuilder, ControlGroup, Control, Validators} from '@angular/common';
import {SettingsService, COUNTRIES, Country} from './settings.service';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  template: `
    <form [ngFormModel]="settingsForm">
      <div class="form-group">
        <label>Please pick the iTunes API country</label>
        <select class="form-control" ngControl="country">
          <option *ngFor="let country of countries" [value]="country.code">{{country.name}}</option>
        </select>
      </div>
      <button class="btn btn-default" (click)="save()">Save</button>
    </form>
  `,
  directives: [FORM_DIRECTIVES],
  providers: [FORM_PROVIDERS, SettingsService]
})
export class SettingsPageComponent implements OnInit {
  country:string;
  settingsForm:ControlGroup;
  countries:Country[] = [];
  constructor(private fb:FormBuilder, private settingsService:SettingsService) {}

  ngOnInit() {
    for(let key in COUNTRIES) {
      if(COUNTRIES.hasOwnProperty(key)) {
        this.countries.push(COUNTRIES[key]);
      }
    }
    this.settingsForm = this.fb.group({
      country: [this.settingsService.country.code]
    });
  }

  save() {
    this.settingsService.setByCode(this.settingsForm.value.country);
  }
}

import {Component, OnInit} from '@angular/core';
import {FORM_PROVIDERS, FORM_DIRECTIVES, FormBuilder, ControlGroup, Control, Validators} from '@angular/common';
import {SettingsService} from './settings.service';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {ProfileModel, COUNTRIES, Country} from './profile.model';
import {PrettyJsonPipe} from '../utils/prettyjson.pipe';

@Component({
  pipes: [PrettyJsonPipe],
  template: `
    <form>
      <div class="row">
        <pre class="col-xs-6" [innerHtml]="profile | async | json"></pre>
        <pre class="col-xs-5" [innerHtml]="{} | json"></pre>
      </div>
      <div>Form is
        <p [innerText]="false ? 'Pristine' : 'Dirty'"></p>
        <p [innerText]="false ? 'Valid' : 'Invalid'"></p>
      </div>
      <div class="form-group">
        <label>Please pick the iTunes API country</label>
        <select class="form-control">
          <option *ngFor="let country of countries" [ngValue]="country">{{country.name}}</option>
        </select>
        <label>Display currency symbol</label>
        <input name="displayCurrencySymbol" type="checkbox">
      </div>
      <div class="form-group">
        <label>First name</label>
        <input class="form-control" name="firstName" type="text">
        <label>Last name</label>
        <input class="form-control" name="lastName" type="text">
        <label>Initials</label>
        <input class="form-control" name="initials" type="text">
      </div>
      <div class="form-group">
        <label>Max number of items in history</label>
        <input type="number">
      </div>
      <button class="btn btn-default">Save</button>
    </form>
  `,
  directives: [FORM_DIRECTIVES],
  providers: [FORM_PROVIDERS, SettingsService]
})
export class SettingsPageComponent implements OnInit {
  country:string;
  countries:Country[] = [];
  profile:Promise<ProfileModel>;
  constructor(private fb:FormBuilder, private settingsService:SettingsService, private router:Router) {}

  ngOnInit() {
    this.countries = COUNTRIES;
    this.profile = this.settingsService.currentProfile;
  }

  save() {
    // Implement this...
  }
}

import {Component, OnInit} from '@angular/core';
import {FORM_PROVIDERS, FORM_DIRECTIVES, FormBuilder, ControlGroup, Control, Validators} from '@angular/common';
import {SettingsService} from './settings.service';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {ProfileModel, COUNTRIES, Country} from './profile.model';
import {PrettyJsonPipe} from '../utils/prettyjson.pipe';

@Component({
  pipes: [PrettyJsonPipe],
  template: `
    <form [ngFormModel]="profilesListForm">
      <select ngControl="viewingWhich">
        <option *ngFor="let name of (profileNames | async)" [value]="name">{{name}}</option>
      </select>
      <button [hidden]="addingProfile" (click)="addingProfile = true">New</button>
      <button [hidden]="addingProfile" (click)="setDefault(which.value)">Set as default</button>
      <input [hidden]="!addingProfile" ngControl="newName" #nM>
      <button [hidden]="!addingProfile" (click)="addNewProfile(nM.value); nM.value = ''; addingProfile = false;">Add</button>
    </form>
    <form #theForm="ngForm" (ngSubmit)="save(theForm)">
      <div class="row">
        <pre class="col-xs-6" [innerHtml]="profile | async | json"></pre>
        <pre class="col-xs-5" [innerHtml]="theForm.value | json"></pre>
      </div>
      <div>Form is
        <p [innerText]="theForm.pristine ? 'Pristine' : 'Dirty'"></p>
        <p [innerText]="theForm.valid ? 'Valid' : 'Invalid'"></p>
      </div>
      <div class="form-group" ngControlGroup="localisation">
        <label>Please pick the iTunes API country</label>
        <select class="form-control" ngControl="country">
          <option *ngFor="let country of countries" [ngValue]="country">{{country.name}}</option>
        </select>
        <label>Display currency symbol</label>
        <input ngControl="displayCurrencySymbol" name="displayCurrencySymbol" type="checkbox">
      </div>
      <div class="form-group" ngControlGroup="details" #detailsChunk="ngForm">
        <label>First name</label>
        <input ngControl="firstName" required #fn="ngForm" (change)="i.control.updateValue(fn.value?.charAt(0)+ln.value?.charAt(0))" class="form-control" name="firstName" type="text">
        <label>Last name</label>
        <input ngControl="lastName" #ln="ngForm" (change)="i.control.updateValue(fn.value?.charAt(0)+ln.value?.charAt(0))" class="form-control" name="lastName" type="text">
        <label>Initials</label>
        <input ngControl="initials" class="form-control" maxlength="2" #i="ngForm" name="initials" type="text">
        <pre>{{detailsChunk.value | json:4:false}}</pre>
      </div>
      <div class="form-group">
        <label>Max number of items in history</label>
        <input type="number" ngControl="historyMax">
      </div>
      <button class="btn btn-default">Save</button>
    </form>
  `,
  directives: [FORM_DIRECTIVES],
  providers: [FORM_PROVIDERS, SettingsService]
})
export class SettingsPageComponent implements OnInit {
  country:string;
  settingsForm:ControlGroup;
  countries:Country[] = [];
  theModel:any;
  profile:Promise<ProfileModel>;
  profileNames:Promise<string[]>;
  profilesListForm:ControlGroup;
  constructor(private fb:FormBuilder, private settingsService:SettingsService, private router:Router) {}

  ngOnInit() {
    this.countries = COUNTRIES;
    this.profile = this.settingsService.currentProfile;
    this.profileNames = this.settingsService.profileNames;
    this.profilesListForm = this.fb.group({
      viewingWhich: this.fb.control('default'),
      newName: ['', Validators.required]
    });
    // Observing changes
    this.profilesListForm.find('viewingWhich').valueChanges.subscribe(value => this.loadProfile(value));
  }

  loadProfile(name:string) {
    this.settingsService.getProfile(name)
      .then(profile => console.log(profile))
      .catch(() => console.log('Problem'));
  }

  addNewProfile(name:string) {
    this.settingsService.addNewProfile(name)
      .then(_ => this.profileNames = this.settingsService.profileNames);
  }

  save() {
    debugger;
    if(!this.settingsForm.valid) {
      window.alert('Pick a country');
      return;
    }
    this.settingsService.setByCode(this.settingsForm.value.country);
    this.router.navigate(['/search']);
  }
}

import {Component, OnInit, OnDestroy} from '@angular/core';
import {FORM_PROVIDERS, FORM_DIRECTIVES, FormBuilder, ControlGroup, Control, Validators, NgForm} from '@angular/common';
import {SettingsService} from './settings.service';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {ProfileModel, COUNTRIES, Country} from './profile.model';
import {PrettyJsonComponent, SafeJsonPipe} from 'angular2-prettyjson';
import {Subscription, Observable} from 'rxjs/Rx';

@Component({
  pipes: [SafeJsonPipe],
  templateUrl: 'app/settings/settings.page.html',
  directives: [PrettyJsonComponent, FORM_DIRECTIVES],
  providers: [FORM_PROVIDERS, SettingsService]
})
export class SettingsPageComponent implements OnInit {
  country:string;
  countries:Country[] = [];
  profile:ProfileModel;
  profileNames:string[];
  profileForm:ControlGroup;
  detailsGroup:ControlGroup;
  firstNameControl:Control;
  lastNameControl:Control;
  initialsControl:Control;
  viewingWhichControl:Control;
  initialsCompiler:Subscription;
  constructor(private fb:FormBuilder, private settingsService:SettingsService, private router:Router) {}

  ngOnInit() {
    this.countries = COUNTRIES;
    this.profile = this.settingsService.currentProfile;
    this.profileNames = this.settingsService.profileNames;

    // Existing form control
    this.viewingWhichControl = this.fb.control('default');
    this.viewingWhichControl.valueChanges.subscribe(value => console.log(value));

    // Create form model
    this.profileForm = this.fb.group({
      localisation: this.fb.group({
        displayCurrencySymbol: [this.profile.localisation.displayCurrencySymbol],
        country: [COUNTRIES.find(item => this.profile.localisation.country && item.code === this.profile.localisation.country.code) || '']
      }),
      details: this.fb.group({
        firstName: [this.profile.details.firstName],
        lastName: [this.profile.details.lastName],
        initials: [this.profile.details.initials]
      }),
      historyMax: [this.profile.historyMax]
    });
    this.detailsGroup = <ControlGroup>this.profileForm.find('details');
    this.firstNameControl = this.profileForm.find(['details', 'firstName']) as Control;
    this.lastNameControl = this.profileForm.find(['details', 'lastName']) as Control;
    this.initialsControl = this.profileForm.find(['details', 'initials']) as Control;
    // First name stream:
    // Joe ---- Joey -------- "" ---------------------------------------------- a - an - ant ---
    // Last name stream
    // Biden --------------------------------- "" - B - "" - D - Da ----------------
    Observable.combineLatest(
      this.firstNameControl.valueChanges
      .map(v => v ? v[0].toUpperCase() : '')
      // First name stream mapped
      // J ---- J -------- "" ---------------------------------------------- A - A - A ---
      .distinctUntilChanged()
      // Distinct values
      // J --------------- "" ---------------------------------------------- A -----------
      , this.lastNameControl.valueChanges.map(v => v ? v[0].toUpperCase() : '')
      // Last name stream mapped
      // B ------------------------------------- "" - B - "" - D -------------------
      .distinctUntilChanged()
      // Distinct
      // B ------------------------------------- "" - B - "" - D -------------------
    )
    // Combined latest
    // [J,B] ----- ["", B] ---------------- ["", ""] - ["",B] - ["",""] - ["",D] ----------- [A,D]
    .subscribe(([first, last]) => {
      console.log(first, last);
      this.initialsControl.updateValue(`${first}${last}`);
    });

  }

  addNewProfile(name:string) {
    this.settingsService.addNewProfile(name);
  }

  save() {
    // Implement this...
  }
}

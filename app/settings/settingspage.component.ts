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
  }

  addNewProfile(name:string) {
    this.settingsService.addNewProfile(name);
  }

  save() {
    // Implement this...
  }
}

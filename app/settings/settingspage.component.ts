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
  profile = new ProfileModel('temp');
  profileNames:Promise<string[]>;
  profileForm:ControlGroup;
  profilesListForm:ControlGroup;
  detailsGroup:ControlGroup;
  firstNameControl:Control;
  lastNameControl:Control;
  initialsControl:Control;
  viewingWhichControl:Control;
  newNameControl:Control;
  initialsCompiler:Subscription;
  constructor(private fb:FormBuilder, private settingsService:SettingsService, private router:Router) {}

  ngOnInit() {
    this.countries = COUNTRIES;
    this.profileNames = this.settingsService.profileNames;

    // Existing form control
    this.viewingWhichControl = this.fb.control('');
    this.newNameControl = this.fb.control('');
    this.profilesListForm = this.fb.group({
      viewingWhichControl: this.viewingWhichControl,
      newName: this.newNameControl
    });
    // Trigger reload of profile on select list change
    this.viewingWhichControl.valueChanges.subscribe(name => this.loadProfile(name).then(profile => {
      this.profile = profile;
      // Some controls can't use ngModel e.g. here because the country control needs its value to be a particular country object, not an object with same values. It compares by reference. So we find the corresponding Country inside COUNTRIES and then update value
      (this.profileForm
        .find(['localisation', 'country']) as Control)
        .updateValue(COUNTRIES.find(item => item.code === profile.localisation.country.code));
    }));
    // This will trigger the above, the first time and thus load the profile
    this.settingsService.currentName.then(name => this.viewingWhichControl.updateValue(name));

    // Here you can see various programmatical ways of building the control groups/controls
    // We can...
    // Create some controls first
    this.firstNameControl = new Control('');
    this.lastNameControl = this.fb.control('');
    // Create a group without all its controls
    this.detailsGroup = this.fb.group({
      initials: ['']
    });
    // Add the controls programmatically
    this.detailsGroup.addControl('firstName', this.firstNameControl);
    this.detailsGroup.addControl('lastName', this.lastNameControl);

    // Create form model
    this.profileForm = this.fb.group({
      localisation: this.fb.group({
        displayCurrencySymbol: [false],
        country: [COUNTRIES[0]]
      }),
      details: this.detailsGroup,
      historyMax: [5]
    });

    // Validation
    this.lastNameControl.validator = Validators.required;
    this.firstNameControl.validator = Validators.pattern('[A-Za-z0-9]*');
  }

  loadProfile(name:string):Promise<ProfileModel> {
    console.log(`Loading profile ${name}`);
    return this.settingsService.getProfile(name);
  }

  addNewProfile(name:string) {
    this.settingsService.addNewProfile(name);
  }

  setDefault() {
    this.settingsService.setDefault(this.viewingWhichControl.value);
  }

  save() {
    this.settingsService.saveProfile(this.profile.name, this.profileForm.value);
    window.alert('Saved');
  }
}

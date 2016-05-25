import {Injectable} from '@angular/core';
import {ProfileModel} from './profile.model';


@Injectable()
export class SettingsService {
  private holder = 'ITUNES_BROWSER_PROFILES';
  private currentHolder = 'ITUNES_BROWSER_CURRENT_PROFILE';
  private defaultName = 'default';

  get profileNames() {
    return this.getProfiles()
      .map(item => item.name);
  }

  getProfile(name:string):ProfileModel {
    let p = this.getProfiles().find(item => item.name === name);
    if(!p) {
      throw `Unable to get profile with name ${name}`;
    }
    return p;
  }

  get defaultProfile():ProfileModel {
    let profiles = this.getProfiles();
    return profiles.find(item => item.name === this.defaultName);
  }

  setDefault(name:string):boolean {
    window.localStorage.setItem(this.currentHolder, name);
    return true;
  }

  get currentProfileName():string {
    return window.localStorage.getItem(this.currentHolder) || this.defaultName;
  }

  get currentProfile():ProfileModel {
    let profiles = this.getProfiles();
    let found = profiles.find(item => item.name === this.currentProfileName);
    return found || this.defaultProfile;
  }

  addNewProfile(name:string):boolean {
    let profiles = this.getProfiles();
    profiles.push(new ProfileModel(name));
    return this.saveProfiles(profiles);
  }

  saveProfile(name:string, profile:ProfileModel):boolean {
    let profiles = this.getProfiles();
    let p = profiles.find(item => item.name === name);
    if(!p) {
      // create
      p = new ProfileModel(name);
      profiles.push(p);
    }
    Object.assign(p, profile);
    return this.saveProfiles(profiles);
  }

  private saveProfiles(profiles:ProfileModel[]):boolean {
    window.localStorage.setItem(this.holder, JSON.stringify(profiles));
    // Would have true/false on success
    return true;
  }

  private getProfiles():ProfileModel[] {
    let profiles:ProfileModel[] = [];
    let serializedProfiles = window.localStorage.getItem(this.holder);
    if(serializedProfiles) {
      profiles = JSON.parse(serializedProfiles);
    } else {
      profiles = [new ProfileModel(this.defaultName)];
    }
    return profiles;
  }
}

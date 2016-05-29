import {Injectable} from '@angular/core';
import {ProfileModel} from './profile.model';

function delay(t:number) {
  return new Promise(resolve => setTimeout(resolve, t));
}

@Injectable()
export class SettingsService {
  private holder = 'ITUNES_BROWSER_PROFILES';
  private currentHolder = 'ITUNES_BROWSER_CURRENT_PROFILE';
  private defaultName = 'default';

  get profileNames():Promise<string[]> {
    return this.getProfiles()
      .then(profiles => profiles.map(item => item.name));
  }

  getProfile(name:string):Promise<ProfileModel> {
    return this.getProfiles()
      .then(profiles =>  {
        let p = profiles.find(item => item.name === name);
        if(!p) {
          return Promise.reject<ProfileModel>(null);
        }
        return Promise.resolve(p);
      });
  }

  get defaultProfile():Promise<ProfileModel> {
    return this.getProfiles()
      .then(profiles => profiles.find(item => item.name === this.defaultName));
  }

  get currentName():Promise<string> {
    return Promise.resolve(window.localStorage.getItem(this.currentHolder) || this.defaultName);
  }

  setDefault(name:string):Promise<boolean> {
    window.localStorage.setItem(this.currentHolder, name);
    return Promise.resolve(true);
  }

  get currentProfile():Promise<ProfileModel> {
    return this.currentName.then(name => this.getProfile(name));
  }

  addNewProfile(name:string):Promise<boolean> {
    return this.getProfiles()
      .then(profiles => {
        profiles.push(new ProfileModel(name));
        return profiles;
      })
      .then(profiles => this.saveProfiles(profiles));
  }

  saveProfile(name:string, profile:ProfileModel):Promise<boolean> {
    return this.getProfiles()
      .then(profiles => {
        // try to find corresponding profile
        let p = profiles.find(item => item.name === name);
        if(!p) {
          // create
          p = new ProfileModel(name);
          profiles.push(p);
        }
        Object.assign(p, profile);
        return this.saveProfiles(profiles);
      });
  }

  private saveProfiles(profiles:ProfileModel[]):Promise<boolean> {
    window.localStorage.setItem(this.holder, JSON.stringify(profiles));
    // Would have true/false on success
    return Promise.resolve(true);
  }

  private getProfiles():Promise<ProfileModel[]> {
    let profiles:ProfileModel[] = [];
    let serializedProfiles = window.localStorage.getItem(this.holder);
    if(serializedProfiles) {
      profiles = JSON.parse(serializedProfiles);
    } else {
      profiles = [new ProfileModel(this.defaultName)];
    }
    return Promise.resolve(profiles);
  }
}

export class Track {
  collectionName:string;
  artistName:string;
  trackName:string;
  artworkUrl100:string;
  artworkUrl60:string;
  previewUrl:string;
  collectionPrice:number;

  static fromJson(obj):Track {
    let t = new Track();
    Object.assign(t, obj);
    return t;
  }

  get image():string {
    return this.artworkUrl100 || this.artworkUrl60;
  }
}

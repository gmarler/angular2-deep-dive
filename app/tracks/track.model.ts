
export class Track {
  trackId:number;
  collectionName:string;
  artistName:string;
  artistId:number;
  trackName:string;
  artworkUrl100:string;
  artworkUrl60:string;
  previewUrl:string;
  collectionPrice:number;
  artist:Artist = null;
  releaseDate:Date;

  static fromJson(obj):Track {
    let t = new Track();
    Object.assign(t, obj);
    t.releaseDate = new Date(obj.releaseDate);
    return t;
  }

  update(track:Track) {
    Object.assign(this, track);
  }

  get image():string {
    return this.artworkUrl100 || this.artworkUrl60;
  }
}
/*
  Sample data:
  {"wrapperType":"artist", "artistType":"Artist", "artistName":"Massive Attack", "artistLinkUrl":"https://itunes.apple.com/us/artist/massive-attack/id526404?uo=4", "artistId":526404, "amgArtistId":13625, "primaryGenreName":"Electronic", "primaryGenreId":7}
*/
export class Artist {
  artistId:number;
  artistName:string;
  primaryGenreName:string;

  static fromJson(obj):Artist {
    let t = new Artist();
    Object.assign(t, obj);
    return t;
  }
}

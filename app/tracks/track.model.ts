
export class Track {
  trackId:number;
  collectionName:string;
  kind:string;
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
  albums:Album[] = [];

  static fromJson(obj):Artist {
    let t = new Artist();
    Object.assign(t, obj);
    return t;
  }
}

/* Sample
{"wrapperType":"collection", "collectionType":"Album", "artistId":909253, "collectionId":879273552, "amgArtistId":468749, "artistName":"Jack Johnson", "collectionName":"In Between Dreams", "collectionCensoredName":"In Between Dreams", "artistViewUrl":"https://itunes.apple.com/us/artist/jack-johnson/id909253?uo=4", "collectionViewUrl":"https://itunes.apple.com/us/album/in-between-dreams/id879273552?uo=4", "artworkUrl60":"http://is3.mzstatic.com/image/thumb/Music2/v4/a2/66/32/a2663205-663c-8301-eec7-57937c2d0878/source/60x60bb.jpg", "artworkUrl100":"http://is3.mzstatic.com/image/thumb/Music2/v4/a2/66/32/a2663205-663c-8301-eec7-57937c2d0878/source/100x100bb.jpg", "collectionPrice":8.99, "collectionExplicitness":"notExplicit", "trackCount":16, "copyright":"℗ 2013 Jack Johnson", "country":"USA", "currency":"USD", "releaseDate":"2014-05-27T07:00:00Z", "primaryGenreName":"Rock"}
*/
export class Album {
  collectionId:number;
  collectionName:string;
  collectionPrice:string;
  currency:string;
  releaseDate:Date;
  copyright:string;
  artworkUrl60:string;

  static fromJson(obj):Album {
    let t = new Album();
    Object.assign(t, obj);
    t.releaseDate = new Date(obj.releaseDate);
    return t;
  }
}

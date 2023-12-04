class Song {
    constructor(id, name, img, singer, url) {
        this.id = id;
        this.name = name;
        this.singer = singer;
        this.s_url = url;
        this.img = img;
    }
}

let playListObject = {
    playList : [],
    addSong : function(id, name, url, img, singer) {
        let obj = new Song(id, name, img, singer, url);
        this.playList.push(obj);
        console.log(this.playList);
    },
    deleteSong : function() {

    },
    searchSong : function() {

    },
    sortSongs : function() {

    }
}
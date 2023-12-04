window.addEventListener("load", loadSongs);

var audioPlayer;
function loadSongs() {
    let songsList = document.querySelector("#songs-list");
    audioPlayer = document.querySelector("#audio");
    allSongs.forEach(function(obj) {
        let li = document.createElement("li");
        let img = document.createElement("img");
        img.setAttribute("src",obj.s_img);
        img.className = "w-100";
        let heading = document.createElement("h5");
        heading.innerText = obj.s_name;
        let para = document.createElement("p");
        para.innerText = obj.s_singer;
        let playBtn = document.createElement("button");
        playBtn.innerText = "Play";
        playBtn.className = "btn btn-danger me-4";
        playBtn.setAttribute("title", obj.s_id);
        playBtn.addEventListener("click", playSong);

        let playListBtn = document.createElement("button");
        playListBtn.innerText = "Add to playlist";
        playListBtn.className = "btn btn-primary";
        playListBtn.setAttribute("title", obj.s_id);
        playListBtn.addEventListener("click", addSong);

        li.appendChild(img);
        li.appendChild(heading);
        li.appendChild(para);
        li.appendChild(playBtn);
        li.appendChild(playListBtn);

        songsList.append(li);
    });
}

function playSong() {
    let song_id = this.title;
    let resultArr = allSongs.filter(function(obj) {
        return obj.s_id == song_id;
    });
    let songUrl = resultArr[0].s_url;
    audioPlayer.src = songUrl;
    audioPlayer.play();
    document.querySelector("#current-song").innerText = resultArr[0].s_name;
}

function addSong() {
    let song_id = this.title;
    let resultArr = allSongs.filter(function(obj) {
        return obj.s_id == song_id;
    });
    let arr = playListObject.playList.filter(function(obj){
        return obj.id == song_id;
    });
    if(arr.length !=0){
        alert("Song already exist");
        return;
    }
    
    playListObject.addSong(resultArr[0].s_id, resultArr[0].s_name, resultArr[0].s_url,
        resultArr[0].s_img, resultArr[0].s_singer);

    showPlaylist();
}




function showPlaylist() {
    let playList = document.querySelector("#playlist");
    playList.innerHTML = "";
    playListObject.playList.forEach(function(obj) {
        let li = document.createElement("li");
        let img = document.createElement("img");
        img.setAttribute("src", obj.img);
        let h5 = document.createElement("h5");
        h5.innerHTML = obj.name + "<br>" + obj.singer;
        // let p = document.createElement("p");
        // p.innerText = obj.singer;
        let playBtn = document.createElement("button");
        playBtn.innerText = "Play";
        playBtn.className = "btn btn-danger me-4";
        playBtn.setAttribute("title", obj.id);
        playBtn.addEventListener("click", playSong);

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.className = "btn btn-primary";
        deleteBtn.setAttribute("title", obj.id);
        // playListBtn.addEventListener("click", addSong);
        li.appendChild(img);
        li.appendChild(h5);
        // li.appendChild(p);
        li.appendChild(playBtn);
        li.appendChild(deleteBtn);

        playList.appendChild(li);
    })
}

// Declare a variable to keep track of the current song index
let currentSongIndex = 0;

// Function to play the next song
function playNextSong() {
    // Increment the current song index to move to the next song
    currentSongIndex++;

    // Check if the current index exceeds the playlist length, reset to 0 (play from the start)
    if (currentSongIndex >= playListObject.playList.length) {
        currentSongIndex = 0;
    }

    // Get the URL of the next song to play
    let nextSongUrl = playListObject.playList[currentSongIndex].s_url;

    // Update the audio player source to play the next song
    audioPlayer.src = nextSongUrl;

    // Play the next song
    audioPlayer.play();

    // Update the "Currently Playing" display with the next song's name
    document.querySelector("#current-song").innerText = playListObject.playList[currentSongIndex].name;
}

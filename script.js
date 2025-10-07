async function getSongs() {

    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []

    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return songs;
}

async function main() {
    // get the list of all songs
    let songs = await getSongs();
    console.log(songs);

    let songUl = document.querySelector('.songList').getElementsByTagName('ul')[0];
    for (let song of songs) { 
        song = song.replace(".mp3", "")
        songUl.innerHTML += `<li>
                            <img class="invert" src="images/music.svg" style="height: 25px;" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20", " ").split(" - ")[0]}</div>
                                <div>${song.replaceAll("%20", " ").split(" - ")[1]}</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img src="images/play2.svg" class="invert" style="height: 25px;" alt="">
                            </div>
                        </li>`; 
    }


    // play the first song
    var audio = new Audio(songs[0])  
    // audio.play();
    audio.addEventListener("loadeddata", () => {
        let duration = audio.duration;
        console.log(audio.duration, audio.currentSrc, audio.currentTime);
    });

}

main()







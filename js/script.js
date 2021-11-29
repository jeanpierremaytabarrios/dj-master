let body = document.querySelector("body");
let disc = document.getElementById("disc-left");
let data_title = document.getElementById("data-title");
let data_artist = document.getElementById("data-artist");
let song_duration = document.getElementById("song-duration");
let volume_bar = document.querySelector("#volume");
let instant_repr = document.getElementById("instant-repr");
let prev_btn = document.getElementById("prev-btn");
let plause_btn = document.getElementById("play-pause-btn");
let next_btn = document.getElementById("next-btn");
let song_section = document.querySelector(".song-section");
let song_list = document.querySelector(".song-list");
let call_search = document.getElementById("call-search");
let music_audio = document.getElementById("music-audio");
let cons_image = document.querySelector(".cons-image");
let search_btn = document.getElementById("search-btn");
let playing_is = false;
let aux = 0;

let canciones = [
    {
        order: 1,
        title: "STAY",
        artist: "The kid Laroi",
        image: "stay.jpg",
        audio: "The Kid LAROI, Justin Bieber - STAY.m4a",
    },
    {
        order: 2,
        title: "Don't be shy",
        artist: "Tiesto",
        image: "dont be shy.jpg",
        audio: "Tiesto & Karol G - Don't Be Shy.m4a",
    }
];//order, title, artist, image, audio

const compact_list = (array) => {
    array.forEach((e)=>{
        song_list.insertAdjacentHTML("beforeend",
        `<div id="item-${e.order}" class="list-item">
            <div class="item-logo"><img src="img/portadas/${e.image}"></div>
            <div class="item-data">
                <h1 class="item-title">${e.order} - ${e.title}</h1>
                <p class="item-artist">${e.artist}</p>
            </div>
        </div>`);
    });
};

const paste_song = (a) => {
    disc.src = `img/portadas/${a.image}`;
    data_artist.innerHTML = a.artist;
    data_title.innerHTML = a.title;
    music_audio.src = `audio/canciones/${a.audio}`;
    song_duration.value = 0;
};


window.addEventListener("load",()=>{
    paste_song(canciones[0]);
    window.setInterval(() => {
        song_duration.max = music_audio.duration;
    },1);
    window.setInterval(() => {
        song_duration.value = music_audio.currentTime;
    },0.0005);
    window.setInterval(()=>{
        instant_repr.innerHTML = `${Math.floor(Math.ceil(music_audio.currentTime)/60)}:${Math.ceil(music_audio.currentTime)%60} 
        / ${Math.floor(Math.ceil(music_audio.duration)/60)}:${Math.ceil(music_audio.duration)%60}`;
    },1);
});

plause_btn.addEventListener("click",()=>{
    if(playing_is == false)
    {
        playing_is = true;
        music_audio.play();
        plause_btn.firstElementChild.src = "img/varios/pause.jpg";
        cons_image.style.animationPlayState = "running";
        disc.style.animationPlayState = "running";
    }
    else
    {
        playing_is = false;
        music_audio.pause();
        plause_btn.firstElementChild.src = "img/varios/play.jpg";
        cons_image.style.animationPlayState = "paused";
        disc.style.animationPlayState = "paused";
    }
});

volume_bar.addEventListener("change",()=>{
    music_audio.volume = volume_bar.value;
});

song_duration.addEventListener("change",()=>{
    music_audio.currentTime = song_duration.value;
})

next_btn.addEventListener("click",()=>{
    if(aux < canciones.length - 1)
    {
        aux++;
        paste_song(canciones[aux]);
        if(playing_is == true) music_audio.play();
    }
})
prev_btn.addEventListener("click",()=>{
    if(0 < aux)
    {
        aux--;
        paste_song(canciones[aux]);
        if(playing_is == true) music_audio.play();
    }
});

compact_list(canciones);

music_audio.addEventListener("ended",()=>{
    if(aux < canciones.length - 1)
    {
        aux++;
        paste_song(canciones[aux]);
        if(playing_is == true) music_audio.play();
    }
})

call_search.addEventListener("keyup",()=>{
    let g = document.querySelectorAll(".list-item");
    g.forEach((e)=>{e.remove()});
    let result = canciones.filter((e) => e.title.toLowerCase().includes(call_search.value.toLowerCase()) == true);
    console.log("Se ha presionado una tecla");
    if(result)
    {
        compact_list(result);
    }
});
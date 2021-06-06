// js here

const audio = document.querySelector('audio');
const image = document.querySelector('img')
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const runningTime = document.getElementById('current-time');
const totalTime = document.getElementById('duration');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
const progressContainer = document.getElementById('progress-container')
const progressDark = document.getElementById('progress')

let isPlaying = false;

const songs = [
  {
    name : 'Circle Of Love',
    artist : 'Rudy Mancuso',
    source : "music/Circle Of Love Rudy Mancuso.mp3",
    albumart : "img/circle.png",
  },
  {
    name : "Hollywood's Bleeding",
    artist : 'Post Malone',
    source : "music/Hollywood's Bleeding.mp3",
    albumart : "img/post.webp",
  },
  {
    name : 'Midnight City',
    artist : 'M83',
    source : "music/Midnight City.mp3",
    albumart : "img/m83.jpg",
  },
  {
    name : 'Stressed Out',
    artist : 'Twenty One Pilots',
    source : "music/Stressed Out.mp3",
    albumart : "img/twenty.png",
  },
  {
    name : 'Violet City(Instrumental)',
    artist : 'Mansionair',
    source : "music/Mansionair - Violet City Instrumental [FIFA 19].mp3",
    albumart : "img/violet.jpg",
  },
]

function playTrack(){
  audio.play()
  play.classList.replace('fa-play', 'fa-pause');
  play.setAttribute('title', 'pause')
  isPlaying = true;
}

function pauseTrack(){
  audio.pause();
  play.classList.replace('fa-pause', 'fa-play');
  play.setAttribute('title', 'play')
  isPlaying = false;  
}

play.addEventListener('click', function(){
  (isPlaying ? pauseTrack() : playTrack())
});



let songIndex = 0;
function loadSong(file){
  title.textContent = file.name;
  artist.textContent = file.artist;
  image.src = file.albumart;
  audio.src = file.source;
}

function nextSong(){
  songIndex++;
  if (songIndex > songs.length - 1){
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playTrack();

};

function prevSong(){
  songIndex--;
  if (songIndex < 0){
    songIndex = songs.length - 1
  }
  loadSong(songs[songIndex]);
  playTrack();
};

function getTheCurrentTime(WhatsTheTime){
  if (isPlaying) {
    const {duration, currentTime} = WhatsTheTime.srcElement;
    const progressedTimeinPercent = (currentTime/duration) * 100
    progressDark.style.width = `${progressedTimeinPercent}%`

    let durationMinutes = Math.floor(duration/60)
    let durationSeconds = Math.round(duration % 60)

    let runningMinutes = Math.floor(currentTime / 60)
    let runningSeconds = Math.floor(currentTime % 60)
    if (durationMinutes < 10 && durationSeconds < 10){
      totalTime.textContent = `0${durationMinutes}:0${durationSeconds}`
    } else if (durationSeconds < 10){
      totalTime.textContent = `${durationMinutes}:0${durationSeconds}`
    } else if (durationMinutes < 10) {
      totalTime.textContent = `0${durationMinutes}:${durationSeconds}`
    }
    runningTime.textContent = `0${runningMinutes}:0${runningSeconds}`

    console.log(Math.floor(duration)/60) 
    console.log(Math.floor(currentTime%60)) // 1,2,3,4,.....n
    console.log(durationSeconds)

  }
}

//event listeners
next.addEventListener('click', nextSong)
prev.addEventListener('click', prevSong)   
audio.addEventListener('timeupdate', getTheCurrentTime)
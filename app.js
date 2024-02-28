const song = document.querySelector('#audiocontrols');
const progressBar = document.querySelector('#progress');
const buttonsBottom = document.querySelector('#play');
const backButton = document.querySelector('#backward');
const forwardButton = document.querySelector('#forward');
const volumeControl = document.querySelector("#volume");
const timeStartDisplay = document.querySelector('#time-display-start');
const timeEndDisplay = document.querySelector('#time-display-end');

const songs = [
    "./Songs/Shape-of-You---Ed-Sheeran(musicdownload.cc).mp3",
    "./Songs/Zerb Mwaki ft. Sofiya Nzau.mp3"
];
let currentSongIndex = 0;
song.src = songs[currentSongIndex];

buttonsBottom.addEventListener('click', playPause);

song.onloadedmetadata = function () {
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
}

function playPause() {
    if (song.paused) {
        song.play();
    } else {
        song.pause();
    }
}

progressBar.addEventListener('input', scrolling);

function scrolling() {
    song.currentTime = progressBar.value;
}

song.addEventListener('timeupdate', updateTimeDisplay);

function updateTimeDisplay() {
    const startMinutes = Math.floor(song.currentTime / 60);
    const startSeconds = Math.floor(song.currentTime % 60);
    timeStartDisplay.textContent = `${startMinutes}:${startSeconds < 10 ? `0` : ``}${startSeconds}`;
    const endMinutes = Math.floor(song.duration / 60);
    const endSeconds = Math.floor(song.duration % 60);
    timeEndDisplay.textContent = `${endMinutes}:${endSeconds}`;
}

song.addEventListener('timeupdate', update);

function update() {
    progressBar.value = song.currentTime;
}

backButton.addEventListener('click', playPreviousSong);

function playPreviousSong() {
    currentSongIndex--;
    if (currentSongIndex >= 0) {
        song.src = songs[currentSongIndex];
        song.play();
    } else {
        currentSongIndex = 0;
        song.src = songs[currentSongIndex];
        song.play();
    }
}
forwardButton.addEventListener('click', playNextSong);


function playNextSong() {
    currentSongIndex++;
    if (currentSongIndex < songs.length) {
        song.src = songs[currentSongIndex];
        song.play();
    } else {
        currentSongIndex = 0;
        song.src = songs[currentSongIndex];
        song.play();
    }
}

volumeControl.addEventListener('input', volumeProgress);

function volumeProgress() {
    song.volume = volumeControl.value / 100;
}

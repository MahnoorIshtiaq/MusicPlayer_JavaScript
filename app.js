const carousel = [...document.querySelectorAll('.carousel img')];

let carouselImageIndex = 0;

const changeCarousel = () => {
    carousel[carouselImageIndex].classList.toggle('active');

    if(carouselImageIndex >= carousel.length - 1) {
        carouselImageIndex = 0;
    } else {
        carouselImageIndex++;
    }

    carousel[carouselImageIndex].classList.toggle('active');
}

setInterval(() => {
    changeCarousel();
}, 3000);

const musicPlayerSection = document.querySelector('.Music-player-sec');
const homeSection = document.querySelector('.home-section');
const playlistSection = document.querySelector('.playlist');

let clickCount = 1;

musicPlayerSection.addEventListener('click', () => {
    if (clickCount >= 2) {
        musicPlayerSection.classList.add('active');
        clickCount = 1;
        return;
    }
    clickCount++;
    setTimeout(() => {
        clickCount = 1;
    }, 250);
});

const backToHomeBtn = document.querySelector('.Music-player-sec .back-btn');

backToHomeBtn.addEventListener('click', () => {
    musicPlayerSection.classList.remove('active');
    homeSection.classList.remove('hide'); // Show home section
    playlistSection.classList.add('hide'); // Hide playlist section
});

const navBtn = document.querySelector('.Music-player-sec .nav-btn');

navBtn.addEventListener('click', () => {
    playlistSection.classList.add('active');
    homeSection.classList.add('hide'); // Hide home section when navigating to playlist
    playlistSection.classList.remove('hide'); // Show playlist section
});

const playlistBtn = document.querySelector('.playlist .back-btn');

playlistBtn.addEventListener('click', () => {
    playlistSection.classList.remove('active');
    homeSection.classList.remove('hide'); // Show home section
    playlistSection.classList.add('hide'); // Hide playlist section
});

// Ensure only one section is visible at a time
document.querySelectorAll('.back-btn').forEach(button => {
    button.addEventListener('click', () => {
        homeSection.classList.remove('hide');
        playlistSection.classList.add('hide');
    });
});

let currentMusic = 0;

const music = document.querySelector('#audio-source');
const seekBar = document.querySelector('.music-seek-bar');
const songName = document.querySelector('.Current-song-name');
const artistName = document.querySelector('.artist-name');
const coverImage = document.querySelector('.cover');
const currentMusicTime = document.querySelector('.current-time');
const MusicDuration = document.querySelector('.duration');

const queue = [...document.querySelectorAll('.queue')];

//Buttons
const forwardBtn = document.querySelector('i.fa-forward');
const playBtn = document.querySelector('i.fa-play');
const pauseBtn = document.querySelector('i.fa-pause');
const backwardBtn = document.querySelector('i.fa-backward');
const redoBtn = document.querySelector('span.fa-redo');
const volumeBtn = document.querySelector('span.fa-volume-up');

const volumeSlider = document.querySelector('.volume-slider');

playBtn.addEventListener('click',() => {
    music.play();
    playBtn.classList.remove('active');
    pauseBtn.classList.add('active');
})

pauseBtn.addEventListener('click',() => {
    music.pause();
    pauseBtn.classList.remove('active');
    playBtn.classList.add('active');
})

const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;

    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    coverImage.src = song.cover;

    setTimeout(() => {
        seekBar.max = music.duration;
        MusicDuration.innerHTML = formatTime(music.duration);
    }, 300);
    currentMusicTime.innerHTML = '00 : 00';
    queue.forEach(item => item.classList.remove('active'));
    queue[currentMusic].classList.add('active');
}

setMusic(0);


const formatTime = (time) => {
    let min = Math.floor(time / 60); 
    if (min < 10) {
        min = '0' + min;
    }

    let sec = Math.floor(time % 60); 
    if (sec < 10) {
        sec = '0' + sec;
    }

    return `${min} : ${sec}`; 
}


//seekbar//
setInterval(() => {
    seekBar.value = music.currentTime;
    currentMusicTime.innerHTML = formatTime(music.currentTime);
    if(Math.floor(music.currentTime) == Math.floor(seekBar.max)){
        if(redoBtn.className.includes('active')){
           setMusic(currentMusic); 
           playBtn.click();
        }
        else{
            forwardBtn.click();
        }
    }
}, 500);

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
})

forwardBtn.addEventListener('click', () => {
    if(currentMusic >= songs.length - 1){
        currentMusic = 0;
    }
    else {
        currentMusic++;
    }
    setMusic(currentMusic);
    playBtn.click();
})

backwardBtn.addEventListener('click', () => {
    if(currentMusic <= 0){
        currentMusic = songs.length - 1;
    }
    else {
        currentMusic--;
    }
    setMusic(currentMusic);
    playBtn.click();
})


redoBtn.addEventListener('click', () => {
    redoBtn.classList.toggle('active');
})

volumeBtn.addEventListener('click', () => {
    volumeBtn.classList.toggle('active');
    volumeSlider.classList.toggle('active');
})

volumeSlider.addEventListener('input', () => {
    music.volume = volumeSlider.value;
})

//Playlist Queue
queue.forEach((item, i) => {
    item.addEventListener('click', () => {
        setMusic(i);
        playBtn.click();
    })
})
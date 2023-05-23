
// Please replace another link so that it can be played

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $(".row");
const musicPlayer = $(".musicPlayer");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playListContainer");
const start = $("#start");
const end   = $("#end");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: {},
  // (1/2) Uncomment the line below to use localStorage
  // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: "All I Ever Need",
      singer: "Austin Mahone",
      path: "mp3/All I Ever Need - Austin Mahone (Lyrics).mp3",
      image: "images/f343868b-94a7-4001-8b3f-0e284f4988a3_1024.jpg"
    },
    {
      name: " Astronaut In The Ocean",
      singer: "Rain Paris",
      path:
        "mp3/[YT2mp3.info] - Astronaut In The Ocean - Masked Wolf (Rock Cover) (320kbps).mp3",
      image: "images/rain paris.jpg"
    },
    {
      name: "Genie In A Bottle",
      singer: "Rain Paris",
      path: "mp3/[YT2mp3.info] - Genie In A Bottle - Christina Aguilera _ Rock Version by Rain Paris (320kbps).mp3",
      image:
        "images/rain paris.jpg"
    },
    {
      name: "Unholy",
      singer: "Rain Paris",
      path: "mp3/[YT2mp3.info] - Unholy - Sam Smith, Kim Petras _ Rock Version by Rain Paris (320kbps).mp3",
      image:
        "images/rain paris.jpg"
    },
    {
      name: "Angels Or Devils",
      singer: "Dishwalla",
      path: "mp3/Angels Or Devils.mp3",
      image:
        "images/Dishwalla.jpg"
    },
    {
      name: "Holiday",
      singer: "Boys Like Girls",
      path: "mp3/Boys Like Girl - Holiday (320kbps).mp3",
      image:
        "images/BOYS-LIKE.jfif"
    },
    {
      name: "Broken Man",
      singer: "Boys Like Girls",
      path: "mp3/Boys Like Girls - Broken Man (320kbps).mp3",
      image:
        "images/BOYS-LIKE.jfif"
    },
    {
      name: "Heels Over Head",
      singer: "Boys Like Girls",
      path: "mp3/Boys Like Girls - Heels Over Head (320kbps).mp3",
      image:
        "images/BOYS-LIKE.jfif"
    },
    {
      name: "Numb Little Bug",
      singer: "Rain Paris",
      path: "mp3/[YT2mp3.info] - Numb Little Bug - Em Beihold _ Rock Version by Rain Paris (128kbps).mp3",
      image:
        "images/rain paris.jpg"
    }

  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    // (2/2) Uncomment the line below to use localStorage
    // localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
                        <div class="song ${
                          index === this.currentIndex ? "active" : ""
                        }" data-index="${index}">
                            <div class="thumb"
                                style="background-image: url('${song.image}')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    `;
    });
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      }
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    
    // Handle CD spins / stops
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity
    });
    cdThumbAnimate.pause();

  
    // Handle when click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // When the song is played
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    
    // When the song is pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    
    // When the song progress changes
    audio.ontimeupdate = function () {
      
      setInterval(() => {
        var min = Math.floor(audio.duration / 60);
        var sec = Math.floor(audio.duration % 60);
    
        var curMin = Math.floor(audio.currentTime / 60);
        var curSec = Math.floor(audio.currentTime % 60);
    
        if (sec < 10) {
          sec = "0" + sec;
        }
        if (curSec < 10) {
          curSec = "0" + curSec;
        }
        if (min < 10) {
          min = "0" + min;
        }
        if (curMin < 10) {
          curMin = "0" + curMin;
        }
    
        end.innerHTML = min + ":" + sec;
        start.innerHTML = curMin + ":" + curSec;
      }, 1000);

      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    // Handling when seek
    progress.oninput = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
      // audio.play();
    };

    // When next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };


    // When prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    
    // Handling on / off random song
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };


    // Single-parallel repeat processing
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // Handle next song when audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Listen to playlist clicks
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option")) {
        // Handle when clicking on the song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }

    
        // Handle when clicking on the song option
        if (e.target.closest(".option")) {
        }
      }
    };
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }, 300);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    musicPlayer.style.backgroundImage = `url('${this.currentSong.image}')`;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    
    // Assign configuration from config to application
    this.loadConfig();

    
    // Defines properties for the object
    this.defineProperties();

    // Listening / handling events (DOM events)
    this.handleEvents();

    
    // Load the first song information into the UI when running the app
    this.loadCurrentSong();

    // Render playlist
    this.render();


    // Display the initial state of the repeat & random button
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  }
};

app.start();

let body = document.querySelector("body"),
icons = document.querySelector(".icons");
icons.onclick = ()=>{
  body.classList.toggle("dark");
}


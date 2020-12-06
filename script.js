var playlist = [{
    singer: "Crush",
    title: "Whatever You Do (Feat. Gray)",
    src: "./audio/Crush - Whatever You Do (Feat. Gray).mp3",
    bgimg: "./background/Crush - Crush On You.png",
    img: "https://github.com/taehwanno/simple-music-player/blob/master/album-jackets/Crush%20-%20Crush%20On%20You.jpg?raw=true"
  },
  {
    singer: "에일리",
    title: "첫눈처럼 너에게 가겠다",
    src: "./audio/에일리 - 첫눈처럼 너에게 가겠다.mp3",
    bgimg: "./background/에일리 - 도깨비 OST Part.9.png",
    img:  "https://github.com/taehwanno/simple-music-player/blob/master/album-jackets/%EC%97%90%EC%9D%BC%EB%A6%AC%20-%20%EB%8F%84%EA%B9%A8%EB%B9%84%20OST%20Part.9.jpeg?raw=true"
  },
  {
    singer: "Crush",
    title: "Summer Love",
    src: "./audio/Crush - Summer Love.mp3",
    bgimg: "./background/Crush - Outside.png",
    img: "https://github.com/taehwanno/simple-music-player/blob/master/album-jackets/Crush%20-%20Outside.jpg?raw=true"
  },
  {
    singer: "Gallant x Tablo x Eric Nam",
    title: "Cave Me In (Prod. By Lophiile)",
    src: "./audio/Gallant x Tablo x Eric Nam - Cave Me In (Prod. By Lophiile).mp3",
    bgimg: "./background/Gallant x Tablo x Eric Nam - Cave Me In.png",
    img: "https://github.com/taehwanno/simple-music-player/blob/master/album-jackets/Gallant%20x%20Tablo%20x%20Eric%20Nam%20-%20Cave%20Me%20In.jpg?raw=true"
  },
  {
    singer: "Pentatonix",
    title: "Can't Sleep Love",
    src: "./audio/Pentatonix - Can't Sleep Love.wav",
    bgimg: "./background/Pentatonix - PENTATONIX.png",
    img: "https://github.com/taehwanno/simple-music-player/blob/master/album-jackets/Pentatonix%20-%20PENTATONIX.jpg?raw=true"
  },
  {
    singer: "Rihanna",
    title: "Consideration (Feat. SZA)",
    src: "./audio/Rihanna - Consideration (Feat. SZA).mp3",
    bgimg: "./background/Rihanna - Anti (Deluxe).png",
    img: "https://github.com/taehwanno/simple-music-player/blob/master/album-jackets/Rihanna%20-%20Anti%20(Deluxe).jpg?raw=true"
  },
  {
    singer: "Taylor",
    title: "Swimming Pool (Remastered)",
    src: "./audio/Taylor - Swimming Pool (Remastered).mp3",
    bgimg: "./background/Talyer - Palette.png",
    img: "https://github.com/taehwanno/simple-music-player/blob/master/album-jackets/Talyer%20-%20Palette.jpg?raw=true"
  }
];

var index = 0;
var timer = 0;
var inter = null;
var singer = $('#music-singer');
var title = $('#music-title');
var end = $('#duration-end');
var start = $('#duration-start');
var bgwrap = $(".bg-wrap");
var imgbox = $(".img-box");
var wrapWidth = $("#progress-wrap");
var musicImage = $('.music-image');
var musicList = $('#music-list');
var drawer = $('.drawer');
var toggleLabel = $('#drawer-toggle-label');
var homeBtn = $('#home-button');

$(document).ready(function(){
	toggleLabel.click(function(){
		$('#nav').toggleClass('open');
	});
});

$( window ).resize(function() {
  if (singer.text() === "Music Player" || $(window).width() >= 768) {
  musicList.show();
  }
  else if ($(window).width() < 768) {
    musicList.hide();
  }
});



function calculate(endtime){
  var min = Math.floor(endtime/60);
  var secs = Math.floor((endtime/60-min)*60);
  if (secs < 10) {
    secs = "0" + secs;
  }
  var durationTime = min + ":" + secs;
  return durationTime;
};

function createHowl() {
  console.log(index);
  var sound = new Howl({
    src: [playlist[index].src],
    onend: function(){
      start.text("0:00");
      clearInterval(inter);
      timer = 0;
      index = index + 1;
      sound = createHowl()
      sound.play();
    },
    onplay: function() {
      musicImage.show();
      musicList.css("width","42%");
      bgwrap.css("background-image", "url('" + playlist[index].bgimg + "')");
      imgbox.css("background-image", "url('" + playlist[index].img + "')");
      singer.text(playlist[index].singer);
      title.text(playlist[index].title);
      var currentVol = localStorage.getItem('volume');
      volWrap.css("width", currentVol * 100 + "%");
      console.log("get volume");
      sound.volume(currentVol);
      end.text(calculate(sound.duration()));
      localStorage.setItem('index', index);
      inter = setInterval(function (){
        localStorage.setItem('seek', sound.seek());
        var soundSeek = localStorage.getItem('seek');
        console.log(soundSeek);
        timer = soundSeek;
        start.text(calculate(timer));
        wrapWidth.css("width", sound.seek().toFixed(1)/sound.duration().toFixed(1)*100+"%");
      }, 1000);
      if ($(window).width() <= 767) {
        musicList.hide();
        // $('#drawer-list').show();
      }
    },
    onpause: function(){
      clearInterval(inter);
    },
    onstop: function(){
      clearInterval(inter);
      timer = 0;
    },
    onvolume: function(){
      localStorage.setItem('volume', sound.volume());
      var currentVol = localStorage.getItem('volume');
      volWrap.css("width", currentVol * 100 + "%");
    }
  });
  return sound;
}

var sound = createHowl()
localStorage.setItem('volume', sound.volume());

var playBtn = $(".play-button");
playBtn.on("click", function(e){
  if (sound.playing() === false && playBtn.hasClass("fa-play")) {
    playBtn.removeClass("fa-play").addClass("fa-pause");
    sound.play();
  } else if (sound.playing() === true && playBtn.hasClass("fa-pause")) {
    playBtn.removeClass("fa-pause ").addClass("fa-play");
    sound.pause();
    localStorage.removeItem('index', index);
    console.log("remove!");
  }
});


 var preBtn = $('#previous-button');
 preBtn.on("click", function(e){
   if (index !== 0) {
     sound.stop();
     clearInterval(inter);
     timer = 0;
     index = index - 1;
     sound = createHowl();
     sound.play()
     playBtn.removeClass("fa-play").addClass("fa-pause");
   }
 });

 var nextBtn = $('#next-button');
 nextBtn.on("click", function(e){
   if (index !== playlist.length - 1) {
     sound.stop();
     clearInterval(inter);
     timer = 0;
     index = index + 1;
     sound = createHowl();
     sound.play();
     playBtn.removeClass("fa-play").addClass("fa-pause");
   }
 });

var musicItems = $('.music-list-item');

musicItems.click(function(event){
  if (sound.playing() === true) {
    sound.stop();
    clearInterval(inter);
    timer = 0;
    index = Number($(this).attr('x-index'));
    console.log(index);
    sound = createHowl();
    sound.play();
  } else if (sound.playing() === false) {
    clearInterval(inter);
    timer = 0;
    index = Number($(this).attr('x-index'));
    console.log(index);
    sound = createHowl();
    sound.play();
    playBtn.removeClass("fa-play").addClass("fa-pause");
  }
});


var volDown = $(".vol-down");
var volUp = $(".vol-up");
var volWrap = $(".vol-progress-wrap");

volUp.on("click", function() {
  if (sound.volume() < 1 || sound.volume() === 0) {
    console.log("click-up");
    volDown.removeClass("fa-volume-off").addClass("fa-volume-down");
    var vol = null;
    vol = sound.volume() + 0.1;
    sound.volume(vol.toFixed(1));
    volWrap.css("width", vol * 100 + "%");
  }
});

volDown.on("click", function() {
  if (sound.volume() === 0.1) {
    volDown.removeClass("fa-volume-down").addClass("fa-volume-off");
    var vol = null;
    vol = sound.volume() - 0.1;
    sound.volume(vol.toFixed(1));
    volWrap.css("width", "0");
  } else if (sound.volume() <= 1 && sound.volume() > 0.1) {
    console.log("click-down");
    var vol = null;
    vol = sound.volume() - 0.1;
    sound.volume(vol.toFixed(1));
    volWrap.css("width", vol * 100 + "%");
  }
});

$( ".remember" ).on( "click", function checked() {
  localStorage.setItem('checked', $(".remember:checked").length);
  var checked = Number(localStorage.getItem('checked'));
  console.log(checked);
  return checked;
});

document.onreadystatechange = function () {
  if (document.readyState === "interactive") {
    if (checked === 1 && localStorage.getItem("index") !== null) {
      console.log("refresh!!");
      index = Number(localStorage.getItem('index'));
      var soundSeek = localStorage.getItem('seek');
      console.log(soundSeek);
      timer = timer + soundSeek;
      sound = createHowl();
      sound.seek(soundSeek).play();
      playBtn.removeClass("fa-play").addClass("fa-pause");
      localStorage.setItem('checked', $(".remember:checked").length);
    }
  }
}

var checked = Number(localStorage.getItem('checked'));

homeBtn.on("click", function(){
  sound.stop();
  clearInterval(inter);
  timer = 0;
  localStorage.removeItem('index', index);
  location.reload();
});

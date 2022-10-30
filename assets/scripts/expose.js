// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  
  // array of image paths
  let images = [
    "../assets/images/air-horn.svg", "../assets/images/car-horn.svg", "../assets/images/party-horn.svg", 
  ];
  let audio = [
    "../assets/audio/air-horn.mp3", "../assets/audio/car-horn.mp3","../assets/audio/party-horn.mp3"
  ];

  let volumeImages = [
    "../assets/icons/volume-level-0.svg", "../assets/icons/volume-level-1.svg", "../assets/icons/volume-level-2.svg", "../assets/icons/volume-level-3.svg"
  ]
  const jsConfetti = new JSConfetti();

  // used to change the image when we select an option
  function setHorn() {
    // gets the image and audio that we are looking for
    var currImg = document.getElementById("expose").querySelector("img");
    var currAudio = document.querySelector("audio");

    //gets the selected option
    var e = document.getElementById("horn-select");
    var text = e.options[e.selectedIndex].text;

    // if else to get images and audio
    if (text == "Air Horn") {
      currImg.src = images[0];
      currAudio.src = audio[0];
    }
    else if (text == 'Car Horn') {
      currImg.src = images[1];
      currAudio.src = audio[1];
    }
    else if (text == 'Party Horn') {
      currImg.src = images[2];
      currAudio.src = audio[2];
    }
  }

  // function to change volume 
  function changeVolume(e) {
      // gets image and volume value and audio to change
      const img = document.getElementById("volume-controls").querySelector("img");
      const values = e.target.value;
      var audio = document.querySelector("audio");
      // if else to change image
      if (values == 0) {
        img.src = volumeImages[0];
      }
      else if (values < 33) {
        img.src = volumeImages[1];
      }
      else if (values < 67) {
        img.src = volumeImages[2];
      }
      else {
        img.src = volumeImages[3];
      }
      // changes volume based on slider
      audio.volume = values/100;
  }

  //function to play audio
  function playAudio() {
    // get audio
    var audio = document.querySelector("audio");
    // see what horn it is
    var e = document.getElementById("horn-select");
    var text = e.options[e.selectedIndex].text;
    // confetti if party horn
    if (text == 'Party Horn'){
      jsConfetti.addConfetti();
    }
    // play audio
    audio.play();
  }

  // event listener for changing selection
  document.getElementById("horn-select").onchange = setHorn;
  // even listener for playing audio on button click
  document.querySelector("button").onclick = playAudio;
  //event listener for changing image from range
  document.getElementById('volume').addEventListener('input', changeVolume);
}
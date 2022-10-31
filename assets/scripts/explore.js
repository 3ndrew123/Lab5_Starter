// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
    // initializes synthesizer variable
    const synth = window.speechSynthesis;
    // gets dropdown list
    const voiceSelect = document.querySelector('select');
    // gets array of voices, which should be len 0 at first
    let voices = synth.getVoices();

    // populates drop down list
    function populateVoiceList() {
        // creates option for every voice
        for (let i = 0; i < voices.length ; i++) {
            const option = document.createElement('option');
            option.textContent = `${voices[i].name} (${voices[i].lang})`;
            option.setAttribute('data-lang', voices[i].lang);
            option.setAttribute('data-name', voices[i].name);
            voiceSelect.appendChild(option);
        }
    }

    // event listener to keeep getting voices to add to list 
    speechSynthesis.addEventListener("voiceschanged", () => {
        voices = synth.getVoices();
        populateVoiceList();
    })

    // function to speak text with selected voice
    function talk() {
        // checks if speaking atm and doesnt do anything
        if (synth.speaking) {
          console.error("speechSynthesis.speaking");
          return;
        }
        // variables to get text and image
        let inputTxt = document.getElementById('text-to-speak');
        let currImg = document.querySelector('img');
        // executes if there is text
        if (inputTxt.value !== "") {
            // new object so we can speak
            const utterThis = new SpeechSynthesisUtterance(inputTxt.value);
            // changes image to open when we speak
            utterThis.onstart = function (event) {
                currImg.src = "../assets/images/smiling-open.png";
            }
            // changes images when we end
            utterThis.onend = function (event) {
                currImg.src = "../assets/images/smiling.png";
            };
            // we get the option we selected
            const selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");
            //we get the voice that mathces the action
            for (let i = 0; i < voices.length; i++) {
                if (voices[i].name === selectedOption) {
                utterThis.voice = voices[i];
                break;
                }
            }
            // we speak the text from the voice we chose
            synth.speak(utterThis);
        }
      }

      // calls function when you press button to speak
      document.querySelector("button").onclick = talk;

}
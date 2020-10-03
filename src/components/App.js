import React from "react";
import Slider from "./slider";
import "../App.css";

let bankOne = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

let bankTwo = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];

let bank = bankOne;

class App extends React.Component {
  state = { power: true, bank: false, displayStatus: "Heater Kit" };

  powerSwitch = React.createRef();
  bankSwitch = React.createRef();
  drumPads = React.createRef();
  slider = React.createRef();
  audio = React.createRef();

  changePower = () => {
    if (this.state.power === true) {
      this.powerSwitch.current.style.transform = "translateX(0px)";
      this.drumPads.current.style.pointerEvents = "none";
      this.setState({ power: false, displayStatus: "" });
    } else {
      this.powerSwitch.current.style.transform = "translateX(30px)";
      this.drumPads.current.style.pointerEvents = "all";
      this.setState({ power: true });
    }
  };
  changeBank = () => {
    if (this.state.bank === false) {
      this.bankSwitch.current.style.transform = "translateX(30px)";
      this.setState({ bank: true, displayStatus: "Smooth Piano Kit" });
      bank = bankTwo;
    } else {
      this.bankSwitch.current.style.transform = "translateX(0px)";
      this.setState({ bank: false, displayStatus: "Heater Kit" });
      bank = bankOne;
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyPressed);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPressed);
  }

  onKeyPressed = (e) => {
    bank.map((pad) => {
      if (e.keyCode === pad.keyCode && this.state.power) {
        this.audio.current.src = pad.url;
        let sound = this.audio.current;
        this.setState({ displayStatus: pad.id });
        sound.volume = this.slider.current.state.value / 100;
        let playPromise = sound.play();
        if (playPromise !== undefined) {
          playPromise
            .then((_) => {
              sound.currentTime = 0;
              sound.play();
              for (let i = 0; i < this.drumPads.current.children.length; i++) {
                if (this.drumPads.current.children[i].id === pad.id) {
                  this.drumPads.current.children[i].classList.add(
                    "drum-pad-active"
                  );
                  setTimeout(
                    () =>
                      this.drumPads.current.children[i].classList.remove(
                        "drum-pad-active"
                      ),
                    100
                  );
                }
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    });
  };

  render() {
    return (
      <main id="drum-machine">
        <div id="display" className="main-div">
          <div ref={this.drumPads} className="first-column">
            {bank.map((pad) => {
              return (
                <div
                  onClick={() => {
                    this.audio.current.src = pad.url;
                    let sound = this.audio.current;
                    this.setState({ displayStatus: pad.id });
                    sound.volume = this.slider.current.state.value / 100;
                    sound.currentTime = 0;
                    sound.play();
                  }}
                  tabIndex="0"
                  onKeyDown={() => this.onKeyPressed}
                  key={pad.id}
                  className="drum-pad"
                  id={pad.id}
                >
                  <audio
                    ref={this.audio}
                    src={pad.url}
                    className="clip"
                    id={this.props.keyTrigger}
                  />
                  <span>{pad.keyTrigger}</span>
                </div>
              );
            })}
          </div>

          <div className="second-column">
            <div className="power-div">
              <h3>Power</h3>
              <div className="control">
                <div
                  onClick={this.changePower}
                  ref={this.powerSwitch}
                  className="power-switch"
                ></div>
                <span id="off" className="spans">
                  OFF
                </span>
                <span id="on" className="spans">
                  ON
                </span>
              </div>
            </div>
            <Slider
              ref={this.slider}
              display={this.state.displayStatus}
              disabled={this.state.power}
              className="slider"
            />
            <div className="bank-div">
              <h3>Bank</h3>
              <div className="control">
                <div
                  onClick={this.state.power ? this.changeBank : null}
                  ref={this.bankSwitch}
                  className="bank-switch"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;

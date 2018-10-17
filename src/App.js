import React, {Component} from 'react';
import './App.css';
import closed_hat2 from './samples/closed_hat2.wav';
import kick2 from './samples/kick2.wav';
import kick3 from './samples/kick3.wav';
import open_hat from './samples/open_hat.wav';
import shkr1 from './samples/shkr1.wav';
import shkr3 from './samples/shkr3.wav';
import snore1 from './samples/snore1.wav';
import snore2 from './samples/snore2.wav';
import tamp from './samples/tamp.wav';

const keyCodes = {
    '81': 'Q',
    '87': 'W',
    '69': 'E',
    '65': 'A',
    '83': 'S',
    '68': 'D',
    '90': 'Z',
    '88': 'X',
    '67': 'C'
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleDrumClick = (ev) => {
        let id = ev.target.firstChild.textContent;
        if (id)
            this.playAudio(id)
    };

    playAudio = (id) => {
        let audio = document.getElementById(id);
        audio.play();
    };

    checkKey = (e) => {
        e = e || window.event;

        let id = keyCodes[e.keyCode];
        if (id)
            this.playAudio(id);

    };

    componentDidMount = () => {
      document.onkeydown = this.checkKey;
    };

    render() {
        return (
            <div className='App'>
                <div id="drum-machine">
                    <div id="display">
                        <div className='drum-pads'>
                            <div className='drum-pad' onClick={this.handleDrumClick}>
                                Q
                                <audio className='clip' id='Q' src={closed_hat2}/>
                            </div>
                            <div className='drum-pad' onClick={this.handleDrumClick}>
                                W
                                <audio className='clip' id='W' src={kick2}/>
                            </div>
                            <div className='drum-pad' onClick={this.handleDrumClick}>
                                E
                                <audio className='clip' id='E' src={kick3}/>
                            </div>
                            <div className='drum-pad' onClick={this.handleDrumClick}>
                                A
                                <audio className='clip' id='A' src={open_hat}/>
                            </div>
                            <div className='drum-pad' onClick={this.handleDrumClick}>
                                S
                                <audio className='clip' id='S' src={shkr1}/>
                            </div>
                            <div className='drum-pad' onClick={this.handleDrumClick}>
                                D
                                <audio className='clip' id='D' src={shkr3}/>
                            </div>
                            <div className='drum-pad' onClick={this.handleDrumClick}>
                                Z
                                <audio className='clip' id='Z' src={snore1}/>
                            </div>
                            <div className='drum-pad' onClick={this.handleDrumClick}>
                                X
                                <audio className='clip' id='X' src={snore2}/>
                            </div>
                            <div className='drum-pad' onClick={this.handleDrumClick}>
                                C
                                <audio className='clip' id='C' src={tamp}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

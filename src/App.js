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

class App extends Component {
    playAudio = (ev) => {
        let audio = ev.target.childNodes[1];
        audio.play();
    };

    render() {
        return (
            <div className='App'>
                <div id="drum-machine">
                    <div id="display">
                        <div className='drum-pad' onClick={this.playAudio}>
                            Q
                            <audio className='clip' id='Q' src={closed_hat2}/>
                        </div>
                        <div className='drum-pad' onClick={this.playAudio}>
                            W
                            <audio className='clip' id='W' src={kick2}/>
                        </div>
                        <div className='drum-pad' onClick={this.playAudio}>
                            E
                            <audio className='clip' id='E' src={kick3}/>
                        </div>
                        <div className='drum-pad' onClick={this.playAudio}>
                            A
                            <audio className='clip' id='A' src={open_hat}/>
                        </div>
                        <div className='drum-pad' onClick={this.playAudio}>
                            S
                            <audio className='clip' id='S' src={shkr1}/>
                        </div>
                        <div className='drum-pad' onClick={this.playAudio}>
                            D
                            <audio className='clip' id='D' src={shkr3}/>
                        </div>
                        <div className='drum-pad' onClick={this.playAudio}>
                            Z
                            <audio className='clip' id='Z' src={snore1}/>
                        </div>
                        <div className='drum-pad' onClick={this.playAudio}>
                            X
                            <audio className='clip' id='X' src={snore2}/>
                        </div>
                        <div className='drum-pad' onClick={this.playAudio}>
                            C
                            <audio className='clip' id='X' src={tamp}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

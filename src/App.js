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
import metronome from './samples/metronome_tick.wav';

import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'

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


const keys2Names = {
    'Q': 'Closed Hat 1',
    'W': 'Kick 1',
    'E': 'Kick 2',
    'A': 'Open hat',
    'S': 'Shrk 1',
    'D': 'Shrk 2',
    'Z': 'Snore 1',
    'X': 'Snore 2',
    'C': 'Tump'
};


const PLAYDRUM = 'play_drum';
const DISPLAYDRUM = 'display_drum';

const playDrumMsg = (drumCode) => {
    return {
        type: PLAYDRUM,
        drumCode
    }
};
const displayDrumMsg = (drumName) => {
    return {
        type: DISPLAYDRUM,
        drumName
    }
};

const playAudio = (id) => {
    let audio = document.getElementById(id);
    audio.pause();
    audio.currentTime = 0;
    audio.play();
};

const animateDrumButton = (id) => {
    let audio = document.getElementById(id);
    let div = audio.parentElement;
    div.animate([
        // keyframes
        {
            transform: 'translateY(0px)',
            backgroundColor: 'red'
        },
        {
            transform: 'translateY(-10px)',
            backgroundColor: 'blue'
        }
    ], {
        // timing options
        duration: 200,
        iterations: 1
    });
};

const defaultState = {drumDisplay: ''};

const messageReducer = (state = defaultState, action) => {
    switch (action.type) {
        case DISPLAYDRUM:
            return Object.assign({}, state, {drumDisplay: action.drumName});
        case PLAYDRUM:
            playAudio(action.drumCode);
            animateDrumButton(action.drumCode);
            break;
        default:
            break;
    }
    return state;
};
const store = createStore(messageReducer);

class Metronome extends Component {
    constructor(props) {
        super(props);
        this.metroIterval = null;
        this.state = {
            enabled: false,
            bpm: 'disabled'
        }
    }

    changeMetroPace = (ev) => {
        clearInterval(this.metroIterval);

        let bpm = ev.target.value;
        if (bpm === 0)
            return;

        this.metroIterval = setInterval(
            this.tick,
            1000 / (bpm / 60));
        this.setState({bpm})
    };

    tick = () => {
        let circle = document.getElementById('metronomeCircle');
        if (circle.style.backgroundColor === 'red')
            circle.style.backgroundColor = 'white';
        else
            circle.style.backgroundColor = 'red';


        playAudio('metronomeAudio');
    };

    render = () => {
        return (<div>
            <audio src={metronome} id='metronomeAudio'/>
            <input type='checkbox' onClick={() => this.setState({enabled: !this.state.enabled})}/>
            Metronome. BPM: {this.state.bpm}
            <br/>
            {this.state.enabled && <input type='range' max='300' min='0' onChange={this.changeMetroPace}/>}
            <div id='metronomeCircle'/>
        </div>)
    }
}

class App extends Component {

    handleDrumClick = (ev) => {
        let code = ev.target.firstChild.textContent;
        if (code)
            this.props.playDrum(code);
    };


    checkKey = (e) => {
        e = e || window.event;

        let code = keyCodes[e.keyCode];
        if (code)
            this.props.playDrum(code);

    };

    componentDidMount = () => {
        document.onkeydown = this.checkKey;
    };


    render() {
        return (
            <div className='App'>
                <div id="drum-machine">
                    <div id="display">
                        <h2>{this.props.state.drumDisplay}</h2>
                    </div>
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
                <Metronome/>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {state}
};

const mapDispatchToProps = (dispatch) => {
    return {
        playDrum: (drumCode) => {
            dispatch(playDrumMsg(drumCode));
            let drumName = keys2Names[drumCode];
            if (drumName)
                dispatch(displayDrumMsg(drumName))
        }
    }
};

const Container = connect(mapStateToProps, mapDispatchToProps)(App);

class AppWrapper extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Container/>
            </Provider>
        );
    }
};


export default AppWrapper;

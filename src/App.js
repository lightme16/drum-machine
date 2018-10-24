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

const colors = ['red', 'green', 'blue', 'yellow', 'cyan', 'orange'];
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
const CHANGESHADOW = 'changeShadow';
const ANIMATEBUTTON = 'animateButton'

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

const changeShadowMsg = () => {
    return {
        type: CHANGESHADOW
    }
};

const animateButtonMsg = (buttonId) => {
    return {
        type: ANIMATEBUTTON,
        buttonId
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

const changeShadow = () => {
    let drum = document.getElementById('drum-machine');
    drum.animate([
        // keyframes
        {
            boxShadow: '5px 5px ' + colors[Math.floor(Math.random() * colors.length)]
        },
        {
            boxShadow: '5px 5px black'
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
            break;
        case ANIMATEBUTTON:
            animateDrumButton(action.buttonId);
            break;
        case CHANGESHADOW:
            changeShadow();
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
            bpm: 0
        }
    }

    changeMetroPace = (ev) => {
        clearInterval(this.metroIterval);

        let bpm = ev.target.value;
        if (bpm === '0')
            return;

        this.metroIterval = setInterval(
            this.tick,
            1000 / (bpm / 60));
        this.setState({bpm})
    };

    tick = () => {
        this.props.playCallback('metronomeAudio');
        this.props.changeShadow();
    };

    triggerMetronome = () => {
        let newStatus = !this.state.enabled;
        this.setState({enabled: newStatus});
        if (!newStatus)
            clearInterval(this.metroIterval);
    };

    render = () => {
        return (<div id='metronome'>
            <audio src={metronome} id='metronomeAudio'/>
            <input type='checkbox' onClick={this.triggerMetronome}/>
            <label>Metronome. BPM: {this.state.bpm}</label>
            <br/>
            {this.state.enabled && <input type='range' max='300' min='0' onChange={this.changeMetroPace}/>}
            <div id='metronomeCircle'/>
        </div>)
    }
}

function Display(props) {
    return (<div id="display">
        <h2>{props.content}</h2>
    </div>)
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
                    <Display content={this.props.state.drumDisplay}/>
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
                    <Metronome playCallback={this.props.playDrum} changeShadow={this.props.changeShadow} />
                </div>
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
            if (drumCode in keys2Names) {
                dispatch(displayDrumMsg(keys2Names[drumCode]));
                dispatch(animateButtonMsg(drumCode));
                dispatch(changeShadowMsg());
            }
        },
        changeShadow: () => {
            dispatch(changeShadowMsg());
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

import React, { Component } from 'react';
import Tile from './tile';
import Player from './player';

class Game extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tiles: [],
            roll: 0,
            tileEffect: 0,
            currentPlayer: 'Player One',
            prevPlayer: '',
            playerOnePosition: 0,
            playerTwoPosition: 0,
            playerOneTurn: true,
            playerTwoTurn: false,
            playerImageUrl: '',
            commuteEvent: ''
        }

        this.handleRoll = this.handleRoll.bind(this); 
        this.resetBoard = this.resetBoard.bind(this);
    }

    handleGameOver() {
        const gameOver = document.getElementById('game-over');
        gameOver.style.display = 'block';

        setTimeout(function() {
            gameOver.style.display = 'none';
        }, 5000)
    }

    handleTrain(spaces) {
        const train = document.getElementById('train');
        train.style.display = 'block';

        setTimeout(function() {
            train.style.display = 'none';
        }, 5000)

        this.setState({
            tileEffect: spaces
        })
        
    }

    handleTaxi(spaces) {
        const taxi = document.getElementById('taxi');
        taxi.style.display = 'block';

        setTimeout(function() {
            taxi.style.display = 'none';
        }, 5000)

        this.setState({
            tileEffect: spaces
        })
        
    }

    componentWillMount() {
        this.createBoard();
    }

    createBoard() {
        const tiles = [];

        for(let i = 0; i < 100; i++) {
            let playerOne;
            let playerTwo;
            
            if(i === this.state.playerOnePosition) {
                playerOne = true;
            } else if(i === this.state.playerTwoPosition) {
                playerTwo = true;
            } else if(this.state.playerOnePosition >= 99) {
                this.resetBoard();
                this.handleGameOver();
                return false;
            } else if(this.state.playerTwoPosition >= 99) {
                this.resetBoard();
                this.handleGameOver();
                return false;
            }
            
            tiles.push(<Tile id={i} key={i} playerOne={playerOne} playerTwo={playerTwo}/>);
        }

        this.setState({
            tiles
        })
    }

    resetBoard() {
        const train = document.getElementById('train');
        const taxi = document.getElementById('taxi');
        const gameOver = document.getElementById('game-over');
        const playerIcon = document.getElementById('player-icon');

        playerIcon.style.backgroundImage = 'url("https://i.downloadatoz.com/download/icon2/1/f/4/e2207020ac2fa8f0d59683196c41f6ef.jpg")';

        if (train.style.display == 'block' || taxi.style.display == 'block') {
            return false;
        } else if (gameOver.style.display == 'block') {
            return false;
        }

        this.setState({
            roll: 0,
            currentPlayer: 'Player One',
            playerOnePosition: 0,
            playerTwoPosition: 0,
            playerOneTurn: true,
            playerTwoTurn: false,
        }, this.createBoard)
    }

    handleRoll() {
        const roll = Math.ceil(Math.random() * 6);
        const train = document.getElementById('train');
        const taxi = document.getElementById('taxi');
        const gameOver = document.getElementById('game-over');
        const playerIcon = document.getElementById('player-icon');
        const rollDisplay = document.getElementById('roll-display');

        rollDisplay.style.border = '1.5px solid rgb(0, 255, 59)';

        setTimeout(function() {
            rollDisplay.style.border = '1.5px solid rgb(185, 0, 0)';
        }, 400)

        if (train.style.display == 'block' || taxi.style.display == 'block') {
            return false;
        } else if (gameOver.style.display == 'block') {
            return false;
        } else if (this.state.playerOneTurn === true) {
                playerIcon.style.backgroundImage = 'url("http://archer.gamebanana.com/img/ico/sprays/8_bit_mario_jump_preview_2.gif")';

                    this.setState(prevState => {
                            return {
                                roll: roll,
                                currentPlayer: 'Player Two',
                                prevPlayer: 'Player One',
                                playerOnePosition: prevState.playerOnePosition + roll,
                                playerOneTurn: false,
                                playerTwoTurn: true
                            }
                            
                        }, this.createBoard)
            
        } else if (this.state.playerTwoTurn === true) {
                playerIcon.style.backgroundImage = 'url("https://i.downloadatoz.com/download/icon2/1/f/4/e2207020ac2fa8f0d59683196c41f6ef.jpg")';

                this.setState(prevState => {
                    return {
                        roll: roll,
                        currentPlayer: 'Player One',
                        prevPlayer: 'Player Two',
                        playerTwoPosition: prevState.playerTwoPosition + roll,
                        playerOneTurn: true,
                        playerTwoTurn: false
                    }
                }, this.createBoard)
        }
    }
    
    componentDidUpdate() {
        switch(this.state.playerOnePosition) {

            //TAXIS
            case 6:
                this.handleTaxi(6);
                this.setState(prevState => {
                    return {
                        playerOnePosition: prevState.playerOnePosition + 6,
                        commuteEvent:'woke up early, went for a run and ate fruit for breakfast'
                    }
                }, this.createBoard);
                break;
            case 22:
                this.handleTaxi(11);
                this.setState(prevState => {
                    return {
                        playerOnePosition: prevState.playerOnePosition + 11,
                        commuteEvent: 'arrived at the transfer station just in time'
                    }
                }, this.createBoard);
                break;
            case 57:
                this.handleTaxi(10);
                this.setState(prevState => {
                    return {
                        playerOnePosition: prevState.playerOnePosition + 10,
                        commuteEvent: 'listened to NPR on the train'
                    }
                }, this.createBoard);
                break;
            case 61:
                this.handleTaxi(3);
                this.setState(prevState => {
                    return {
                        playerOnePosition: prevState.playerOnePosition + 3,
                        commuteEvent: 'took Citi Bike from the station to the office'
                    }
                }, this.createBoard);
                break;
            case 85:
                this.handleTaxi(7);
                this.setState(prevState => {
                    return {
                        playerOnePosition: prevState.playerOnePosition + 7,
                        commuteEvent: 'qualifiied to beta test Uber\'s self-driving drone taxi'
                    }
                }, this.createBoard);
                break;

            //TRAINS
            case 19:
                this.handleTrain(5);
                this.setState(prevState => {
                    return {
                        playerOnePosition: prevState.playerOnePosition - 5,
                        commuteEvent: 'has train traffic ahead'
                    }
                }, this.createBoard);
                break;
            case 36:
                this.handleTrain(10);
                this.setState(prevState => {
                    return {
                        playerOnePosition: prevState.playerOnePosition - 10,
                        commuteEvent: 'has mechanical problems at West 4th Street'
                    }
                }, this.createBoard);
                break;
            case 44:
                this.handleTrain(12);
                this.setState(prevState => {
                    return {
                        playerOnePosition: prevState.playerOnePosition - 12,
                        commuteEvent: 'has too many hipsters on the train. Wait for the next one'
                    }
                }, this.createBoard);
                break;
            case 73:
                this.handleTrain(3);;
                this.setState(prevState => {
                    return {
                        playerOnePosition: prevState.playerOnePosition - 3,
                        commuteEvent: 'is stuck behind tourists on a FiDi sidewalk'
                    }
                }, this.createBoard);
                break;
            case 97:
                this.handleTrain(16);
                this.setState(prevState => {
                    return {
                        playerOnePosition: prevState.playerOnePosition - 16,
                        commuteEvent: 'can\'t afford surge pricing'
                    }
                }, this.createBoard);
                break;
        };

        switch(this.state.playerTwoPosition) {
                
            //TAXIS
            case 6:
                this.handleTaxi(6);
                this.setState(prevState => {
                    return {
                        playerTwoPosition: prevState.playerTwoPosition + 6,
                        commuteEvent:'woke up early, went for a run and ate fruit for breakfast'
                    }
                }, this.createBoard);
                break;
            case 22:
                this.handleTaxi(11);
                this.setState(prevState => {
                    return {
                        playerTwoPosition: prevState.playerTwoPosition + 11,
                        commuteEvent: 'arrived at the transfer station just in time'
                    }
                }, this.createBoard);
                break;
            case 57:
                this.handleTaxi(10);
                this.setState(prevState => {
                    return {
                        playerTwoPosition: prevState.playerTwoPosition + 10,
                        commuteEvent: 'listened to NPR on the train'
                    }
                }, this.createBoard);
            break;
            case 61:
                this.handleTaxi(3);
                this.setState(prevState => {
                    return {
                        playerTwoPosition: prevState.playerTwoPosition + 3,
                        commuteEvent: 'took Citi Bike from the station to the office'
                    }
                }, this.createBoard);
                break;
            case 85:
                this.handleTaxi(7);
                this.setState(prevState => {
                    return {
                        playerTwoPosition: prevState.playerTwoPosition + 7,
                        commuteEvent: 'qualifiied to beta test Uber\'s self-driving drone taxi'
                    }
                }, this.createBoard);
            break;

            //TRAINS
            case 19:
                this.handleTrain(5);
                this.setState(prevState => {
                    return {
                        playerTwoPosition: prevState.playerTwoPosition - 5,
                        commuteEvent: 'has train traffic ahead'
                    }
                }, this.createBoard);
                break;
            case 36:
                this.handleTrain(10);
                this.setState(prevState => {
                    return {
                        playerTwoPosition: prevState.playerTwoPosition - 10,
                        commuteEvent: 'has mechanical problems at West 4th Street'
                    }
                }, this.createBoard);
                break;
            case 44:
                this.handleTrain(12);
                this.setState(prevState => {
                    return {
                        playerTwoPosition: prevState.playerTwoPosition - 12,
                        commuteEvent: 'has too many hipsters on the train. Wait for the next one'
                    }
                }, this.createBoard);
            break;
            case 73:
                this.handleTrain(3);
                this.setState(prevState => {
                    return {
                        playerTwoPosition: prevState.playerTwoPosition - 3,
                        commuteEvent: 'is stuck behind tourists on a FiDi sidewalk'
                    }
                }, this.createBoard);
                break;
            case 97:
                this.handleTrain(16);
                this.setState(prevState => {
                    return {
                        playerTwoPosition: prevState.playerTwoPosition - 16,
                        commuteEvent: 'can\'t afford surge pricing'
                    }
                }, this.createBoard);
            break;
        }
    }

    render() {
        return (
            <div>
                <div className='main'>
                    <div className='ribbon'>
                        <div className='brand'>
                            <h1>Taxis and Trains</h1>
                        </div>
                        <div>
                            <div className='turn'>
                                <div className='player-icon' id='player-icon'></div>
                                <h2>{this.state.currentPlayer}'s turn!</h2>
                            </div>
                        </div>
                    </div>
                    <div className='train' id='train'>
                        <div className='gradient-one'></div>
                        <div className='gradient-two'></div>
                        <div className='gradient-three'></div>
                        <p>{this.state.prevPlayer} {this.state.commuteEvent}. Go back {this.state.tileEffect} spaces.</p>
                        <div className='gradient-four'></div>
                        <div className='gradient-five'></div>
                    </div>
                    <div className='taxi' id='taxi'>
                        <div className='gradient-one'></div>
                        <div className='gradient-two'></div>
                        <div className='gradient-three'></div>
                        <p>{this.state.prevPlayer} {this.state.commuteEvent}. Advance {this.state.tileEffect} spaces.</p>
                        <div className='gradient-four'></div>
                        <div className='gradient-five'></div>
                    </div>
                    <div className='game-over' id='game-over'>
                        <div className='gradient-one'></div>
                        <div className='gradient-two'></div>
                        <div className='gradient-three'></div>
                        <p>Game over! {this.state.prevPlayer} wins! Resetting the board.</p>
                        <div className='gradient-four'></div>
                        <div className='gradient-five'></div>
                    </div>
                    <div id='board'>
                        {this.state.tiles}
                    </div>
                    <div className='controls'>
                        <div className='roll-display' id='roll-display'>Roll: {this.state.roll}</div>
                        <div className='button' id='dice-button' onClick={this.handleRoll}>Roll Dice</div>
                        <div className='button reset' onClick={this.resetBoard}>Reset</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Game;
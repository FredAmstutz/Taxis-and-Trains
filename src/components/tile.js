import React, { Component } from 'react';
import Player from './player';

class Tile extends Component {

    render() {
        switch(this.props.id) {
            case 6:
            case 22:
            case 57:
            case 61:
            case 85:
                return (
                    <div className='tile' id={this.props.id}>
                        <p className='tile-effect'>Taxi</p>
                        {this.props.playerOne ? <Player image={'url("https://i.downloadatoz.com/download/icon2/1/f/4/e2207020ac2fa8f0d59683196c41f6ef.jpg")'}/> : '' }
                        {this.props.playerTwo ? <Player image={'url("http://archer.gamebanana.com/img/ico/sprays/8_bit_mario_jump_preview_2.gif")'}/> : ''}
                        <i class="fas fa-taxi"></i>
                    </div>   
                )

        }

        switch(this.props.id) {
            case 19:
            case 36:
            case 44:
            case 73:
            case 97:
                return (
                    <div className='tile' id={this.props.id}>
                        <p className='tile-effect'>Train</p>
                        {this.props.playerOne ? <Player image={'url("https://i.downloadatoz.com/download/icon2/1/f/4/e2207020ac2fa8f0d59683196c41f6ef.jpg")'}/> : '' }
                        {this.props.playerTwo ? <Player image={'url("http://archer.gamebanana.com/img/ico/sprays/8_bit_mario_jump_preview_2.gif")'}/> : ''}
                        <i class="fas fa-subway"></i>
                    </div>  
                )
        }
        return (
            <div className='tile' id={this.props.id}>
                {this.props.playerOne ? <Player image={'url("https://i.downloadatoz.com/download/icon2/1/f/4/e2207020ac2fa8f0d59683196c41f6ef.jpg")'}/> : '' }
                {this.props.playerTwo ? <Player image={'url("http://archer.gamebanana.com/img/ico/sprays/8_bit_mario_jump_preview_2.gif")'}/> : ''}
                <p className='tile-number'>{this.props.id}</p>
            </div>
        )
    }
}

export default Tile;
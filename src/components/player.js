import React, { Component } from 'react';

class Player extends Component {
    
    render() {
        const divStyle = {
            backgroundImage: this.props.image,
            border: this.props.border
        }

        return (
            <div className='player' style={divStyle}></div>
        )
    }
}

export default Player;
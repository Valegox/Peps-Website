import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact'
import './GamesPanel.css'

class GamesPanel extends React.Component {

    render() {
        return (
            <div id='panelContainer'>
                <h1 id='title'>Mes jeux</h1>

                <div id='panel'>

	                <div 
	                	className='gameIcon' 
	                	onClick={ () => this.props.clickOnGame() }
	                />

	                <div className='gameIcon'>
	                </div>
	                <div className='gameIcon'>
	                </div>
                </div>
            </div>
        )
    }
}

export default GamesPanel


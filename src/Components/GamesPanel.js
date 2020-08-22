import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact'
import firebase from '../Firebase/firebase'
import './GamesPanel.css'

class GamesPanel extends React.Component {

    componentDidMount() {
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).onSnapshot( doc => {
            this.props.setGames(doc.data().games)
        })

        /*
        firebase.firestore().collection('users').doc('EKkTNp6wVRdE1mr478YQuLExcpm1').get().then( doc => {
            firebase.firestore().collection('publicGames').doc('hwJ0eIKSVn1MLOgdQRvL').update({
                components: doc.data().games[0].components
            })
        })
        */
    }

    _logOut() {
        firebase.auth().signOut().then( () => {
            this.props.quit()
        })
    }

    render() {
        const { games } = this.props
        return (
            <div id='panelContainer'>

                <div id='topBar'>
                    <h1 id='title'>Mes jeux</h1>

                    <MDBBtn 
                        color="indigo"
                        onClick={ () => this._logOut() }
                    >
                        Déconnexion
                    </MDBBtn>
                    
                </div>

                <div id='panel'>
                    {
                        games.map( (game, index) => (
        	                <div
        	                	className='gameIcon'
        	                	onClick={ () => this.props.clickOnGame(game) }
                                key={index}
        	                >
                                <span>{game.name}</span>
                            </div>
                        ))
                    }

	                <div
                        className='gameIcon'
                        onClick={ () => this.props.clickOnCreateGame() }
                    >
                        <span>Nouveau jeu</span>
	                </div>
                </div>
            </div>
        )
    }
}

export default GamesPanel


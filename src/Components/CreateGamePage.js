import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact'
import firebase from '../Firebase/firebase'
import './CreateGamePage.css'

class CreateGamePage extends React.Component {

    constructor() {
        super()
        this._gameName = ''
        this._gameDescription = ''
    }

    _createGame = () => {
        if (this._gameName.length > 0) {
            const newGame = {
                name: this._gameName,
                description: this._gameDescription,
                components: {
                    Main: {
                        name: 'Main',
                        code: 'CONSOLE //afficher la console\n\n//Ecris ton code ici',
                        style: {
                            flexDirection: 'column', 
                            flexWrap: 'nowrap',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            width: '100%',
                            height: '100%'
                        },
                        visible: null,
                        type: null,
                        children: {},
                        textContent: ''
                    }
                }
            }
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
                games: firebase.firestore.FieldValue.arrayUnion(newGame)
            }).then( () => {
                this.props.clickOnCode(newGame)
            })
        }
    }

    render() {
        return (
            <div id='createGameContainer'>

                <h1 id='title'>Quel sera ton nouveau jeu ?</h1>

                <div id='formArea'>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md="6">
                                <form onSubmit={ e => this._submit(e) }>

                                    <label htmlFor="formGroupExampleInput"><span>Nom du jeu</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="formGroupExampleInput"
                                        onChange={ e => { this._gameName = e.target.value }}
                                    />

                                    <br/>

                                    <label htmlFor="formGroupExampleInput"><span>But du jeu</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="formGroupExampleInput"
                                        onChange={ e => { this._gameDescription = e.target.value }}
                                    />

                                    <div className="text-center mt-4">
                                        <MDBBtn color="indigo" onClick={this._createGame}>Let's code !</MDBBtn>
                                    </div>
                                </form>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            </div>
        )
    }
}

export default CreateGamePage
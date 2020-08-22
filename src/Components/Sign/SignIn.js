import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact'
import firebase from '../../Firebase/firebase'
import './SignPage.css'
import './SignIn.css'

class SignIn extends React.Component {

    constructor() {
        super()
        this.state = {
            error: undefined
        }
        this._email = ''
        this._password = ''
    }

    _submit(e) {
        e.preventDefault()

        firebase.auth().signInWithEmailAndPassword(this._email, this._password).then( () => {

            this.props.register()

        }).catch( error => {
            this.setState({
                error: error.code
            })
        })
    }

    render() {
        const { error } = this.state
        return (
            <div id='signContainer'>
                <img
                    src={require('../../img/peps_icon.png')}
                    id='pepsIcon'
                />
                <div id='signArea'>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md="6">
                                <form onSubmit={ e => this._submit(e) }>
                                    <p className="h4 p-center mb-4">J'ai déjà un compte Peps</p>

                                    <label htmlFor="defaultFormLoginEmailEx" className="grey-p">
                                        <span>Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="defaultFormLoginEmailEx"
                                        className="form-control"
                                        onChange={ e => { this._email = e.target.value }}
                                    />

                                    <br />

                                    <label htmlFor="defaultFormLoginPasswordEx" className="grey-p">
                                        <span>Mot de passe</span>
                                    </label>
                                    <input
                                        type="password"
                                        id="defaultFormLoginPasswordEx"
                                        className="form-control"
                                        onChange={ e => { this._password = e.target.value }}
                                    />

                                    <br />
                                    
                                    <div id='noAccountLinkContainer'>
                                        <a id="noAccountLink" onClick={ () => this.props.toggleSignUp() }><span>Je n'ai pas encore de compte</span></a>
                                    </div>

                                    <div id='buttonContainer' className="div-center mt-4">
                                        <MDBBtn color="indigo" type="submit">Connexion</MDBBtn>
                                    </div>
                                </form>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>

                {
                    error === 'auth/email-not-found' ?
                        <p>Ce mail ne correspond à aucun utilisateur.</p>
                    : error === 'auth/invalid-email' ?
                        <p>Ce mail ne correspond à aucun utilisateur.</p>
                    : error === 'auth/wrong-password' ?
                        <p>Mauvais mot de passe</p>
                    : error !== undefined &&
                        <p>Une erreur inconnue s'est produite. Vérifiez votre connexion internet. ({error})</p>
                }
            </div>
        )
    }
}

export default SignIn
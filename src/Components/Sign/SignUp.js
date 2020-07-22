import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact'
import firebase from '../../Firebase/firebase'
import './SignPage.css'

class SignUp extends React.Component {

    constructor() {
        super()

        this.state = {
            error: undefined
        }

        this._userName = ''
        this._email = ''
        this._confirmEmail = ''
        this._password = ''
    }

    _submit(e) {
        e.preventDefault()

        if (this._email === this._confirmEmail) {
            firebase.auth().createUserWithEmailAndPassword(this._email, this._password).then( user => {    
                if (user) {
                    const { currentUser } = firebase.auth()
                    if (currentUser !== null) {
                        currentUser.updateProfile({
                            displayName: this._userName
                        })

                        firebase.firestore().collection('users').doc(currentUser.uid).set({
                            name: this._userName,
                            games: []
                        }).then( () => {
                            this.props.register()
                        })
                    }
                }
            }, error => {
                this.setState({
                    error: error.code
                })
            }) 
        }
    }

    render() {
        const { error } = this.state
        return (
            <div id='signContainer'>
                <div id='signArea'>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md="6">
                                <form onSubmit={ e => this._submit(e) }>
                                    <p className="h4 p-center mb-4">Je n'ai pas encore de compte</p>

                                    <label htmlFor="defaultFormLoginEmailEx" className="grey-p">
                                        <span>Nom d'utilisateur</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        id="defaultFormLoginEmailEx" 
                                        className="form-control"
                                        onChange={ e => { this._userName = e.target.value } }
                                    />

                                    <br />

                                    <label htmlFor="defaultFormLoginEmailEx" className="grey-p">
                                        <span>Email</span>
                                    </label>
                                    <input 
                                        type="email" 
                                        id="defaultFormLoginEmailEx" 
                                        className="form-control"
                                        onChange={ e => { this._email = e.target.value } }
                                    />

                                    <br />

                                    <label htmlFor="defaultFormLoginEmailEx" className="grey-p">
                                        <span>Confirmer l'email</span>
                                    </label>
                                    <input 
                                        type="email" 
                                        id="defaultFormLoginEmailEx" 
                                        className="form-control"
                                        onChange={ e => { this._confirmEmail = e.target.value } }
                                    />

                                    <br/>

                                    <label htmlFor="defaultFormLoginPasswordEx" className="grey-p">
                                        <span>Mot de passe</span>
                                    </label>
                                    <input 
                                        type="password" 
                                        id="defaultFormLoginPasswordEx" 
                                        className="form-control"
                                        onChange={ e => { this._password = e.target.value } }
                                    />

                                    <br />
                                    
                                    <div id='noAccountLinkContainer'>
                                        <a id="noAccountLink" onClick={ () => this.props.toggleSignIn() }><span>J'ai déjà un compte</span></a>
                                    </div>

                                    <div className="p-center mt-4">
                                        <MDBBtn color="indigo" type="submit">Connexion</MDBBtn>
                                    </div>
                                </form>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>

                    {
                        error === 'auth/invalid-email' ?
                            <p>Mail invalide: vérifiez qu'il n'y ai pas d'espace.</p>
                        : error === 'auth/email-already-in-use' ?
                            <p>Ce mail est déjà utilisé.</p>
                        : error !== undefined &&
                            <p>Une erreur inconnue s'est produite. Vérifiez votre connexion internet. ({error})</p>
                    }
            </div>
        )
    }
}

export default SignUp
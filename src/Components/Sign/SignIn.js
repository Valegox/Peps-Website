import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact'
import './SignPage.css'

class SignIn extends React.Component {

    _submit(e) {
        e.preventDefault()
        this.props.register()
    }

    render() {
        return (
            <div id='signContainer'>
                <h1 id='title'>Peps, pour développeurs.</h1>
                <div id='signArea'>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md="6">
                                <form onSubmit={ e => this._submit(e) }>
                                    <p className="h4 text-center mb-4">J'ai déjà un compte Peps</p>

                                    <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                        Email
                                    </label>
                                    <input type="email" id="defaultFormLoginEmailEx" className="form-control" />

                                    <br />

                                    <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                                        Mot de passe
                                    </label>
                                    <input type="password" id="defaultFormLoginPasswordEx" className="form-control" />

                                    <br />
                                    
                                    <div id='noAccountLinkContainer'>
                                        <a id="noAccountLink" onClick={ () => this.props.toggleSignUp() }>Je n'ai pas encore de compte Peps</a>
                                    </div>

                                    <div className="text-center mt-4">
                                        <MDBBtn color="indigo" type="submit">Connexion</MDBBtn>
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

export default SignIn
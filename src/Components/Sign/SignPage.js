import React from 'react'
import './SignPage.css'
import SignIn from './SignIn'
import SignUp from './SignUp'

class SignPage extends React.Component {

    constructor() {
        super()
        this.state = {
            page: 'signIn'
        }
    }

    render() {
        return (
            <div id='signContainer'>

                {
                    this.state.page === 'signIn' ?
                        <SignIn
                            toggleSignUp={ () => this.setState({ page: 'signUp' })}
                            register={ () => this.props.register() }
                        />
                    : this.state.page === 'signUp' &&
                        <SignUp
                            toggleSignIn={ () => this.setState({ page: 'signIn' })}
                            register={ () => this.props.register() }
                        />
                }

            </div>
        )
    }
}

export default SignPage
import React from 'react'
import './LoginPage.css'


class LoginPage extends React.Component {

    constructor() {
        super()
        this.state = {
            typedName: ''
        }
    }

    render() {
        return (
            <div className="LoginPage">
                <h1>Entrez votre nom</h1>

                <input
                    type='username'
                    value={this.state.typedName}
                />
            </div>
        )
    }
}

export default LoginPage
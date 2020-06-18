import React from 'react'
import firebase from '../../../Firebase/firebase'
import './WriteCodeArea.css'
import compile from '../Compiler/Compiler'

class WriteCodeArea extends React.Component {

    constructor() {
        super()
        this.state = {
            code: ''
        }
    }

    compile() {
        /*compile(this.state.code, this.props.getParentState(), newState => {
            this.props.setParentState(newState)
        })*/

        firebase.firestore().collection('users').doc('0Vsmb2SlhgU6QDSUJmhd').update({
            code: this.state.code
        })
    }

    //ENABLE TAB
    _onKeyDown(event) {
        if (event.keyCode === 9) { //if TAB is pressed
            event.preventDefault()

            let val = this.state.code
            let start = event.target.selectionStart
            let end = event.target.selectionEnd

            this.setState({
                code: val.substring(0, start) + '\t' + val.substring(end)
            },
            () => this.refs.input.selectionStart = this.refs.input.selectionEnd = start + 1)
        }
    }

    render() {
        return (
            <div id='codeWindow'>

                <div id='navBar'>
                    <p>Navigation bar (maybe useless because of components visualization)</p>
                </div>

                <textarea
                    type='text'
                    value={this.state.code}
                    id='codeInput'
                    ref='input'
                    onChange={ event => this.setState({ code: event.target.value }) }
                    onKeyDown={ event => this._onKeyDown(event) }
                    rows={40}
                />

                <button
                    id='compileButton'
                    onClick={ () => this.compile() }
                >
                    Compile
                </button>
            </div>
        )
    }
}

export default WriteCodeArea

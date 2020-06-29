import React from 'react'
import {Controlled as CodeMirror} from 'react-codemirror2'
import './WriteCodeArea.css'

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');

class WriteCodeArea extends React.Component {

    constructor() {
        super()
        this.state = {
            cursorPosition: undefined
        }
    }

    /*
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
    */

    render() {
        return (
            <div id='codeWindow'>

                <CodeMirror
                    value={this.props.code}
                    style={{"width": "150px"}}
                    options={{
                        mode: 'javascript',
                        theme: 'material',
                        lineNumbers: true
                    }}
                    onBeforeChange={(editor, data, value) => {
                        this.props.setCode(value)
                    }}
                    cursor={this.state.cursorPosition}
                />

                {/*<textarea
                    type='text'
                    value={this.state.code}
                    id='codeInput'
                    ref='input'
                    onChange={ event => this.setState({ code: event.target.value }) }
                    onKeyDown={ event => this._onKeyDown(event) }
                    rows={40}
                />*/}


            </div>
        )
    }
}

export default WriteCodeArea

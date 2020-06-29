import React from 'react'
import './App.css'

import SignPage from './Sign/SignPage'
import GamesPanel from './GamesPanel'
import CodePage from './Code/CodePage'

class App extends React.Component {

    constructor() {
        super()
        this.state = {
            page: 'sign'
        }
    }

    render() {
        return (
            <div id='appContainer'>

                {
                    this.state.page === 'sign' ?
                    	<SignPage
                            register={ () => this.setState({ page: 'gamesPanel' }) }
                    	/>
                    : this.state.page === 'gamesPanel' ?
                        <GamesPanel
                            clickOnGame={ () => this.setState({ page: 'codePage' }) }
                        />
                    : this.state.page === 'codePage' &&
                        <CodePage
                        />
                }

            </div>
        )
    }
}

export default App

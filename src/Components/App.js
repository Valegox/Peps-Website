import React from 'react'
import './App.css'
import SignPage from './Sign/SignPage'
import GamesPanel from './GamesPanel'
import CreateGamePage from './CreateGamePage'
import CodePage from './Code/CodePage'

class App extends React.Component {

    constructor() {
        super()
        this.state = {
            page: 'sign',
            openedGame: undefined,
            games: []
        }
    }

    componentDidMount() {
        document.title = 'Peps for developers'
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
                            setGames={ games => this.setState({ games: games }) }
                            games={this.state.games}
                            clickOnGame={ game => this.setState({ page: 'codePage', openedGame: game }) }
                            clickOnCreateGame={ () => this.setState({ page: 'createGame' }) }
                            quit={ () => this.setState({ page: 'sign' }) }
                        />
                    : this.state.page === 'createGame' ?
                        <CreateGamePage
                            clickOnCode={ game => this.setState({ page: 'codePage', openedGame: game }) }
                        />
                    : this.state.page === 'codePage' &&
                        <CodePage
                            game={this.state.openedGame}
                            games={this.state.games}
                            quit={ () => this.setState({ page: 'gamesPanel' }) }
                        />
                }

            </div>
        )
    }
}

export default App

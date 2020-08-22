import React from 'react'
import firebase from '../../Firebase/firebase'
import './CodePage.css'
import ComponentsVisualizationArea from './Windows/ComponentsVisualizationArea' 
import WriteCodeArea from './Windows/WriteCodeArea'
import StyleArea from './Windows/StyleArea'
import SideBar from './Windows/SideBar'

class CodePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            components: props.game.components,
            selectedComponent: 'Main', //string path
            componentHoveredByMouse: null, //string path
            copiedComponent: null, //static component
            selectedWindow: 'code' //if component is visible, nav is displayed and selectedWindow can also be 'style'
        }
    }

    compile() {
        let newGames = [...this.props.games]
        newGames.forEach( (game, index) => {
            if (this.props.game.name === game.name) {
                newGames[index].components = this.state.components

                firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
                    games: newGames
                })
            }
        })
    }

    getComponent = (path) => {
        let { components } = this.state

        let js = 'components'

        let arrayPath = path.split('/')

        for (let key of arrayPath) {
            js = js + "['"+key+"'].children"
        }
        js = js.slice(0, js.length-9) //we remove the last .children
        return eval(js)
    }

    setComponent = (caracteristic, value, path) => {

        console.log(1, value)

        let newComponents = {...this.state.components}

        let js = "newComponents"

        let arrayPath = path.split('/')

        for (let key of arrayPath) {
            js = js + "[\'"+key+"\'].children"
        }

        js = js.slice(0, js.length-9) //we remove the last .children

        if (caracteristic === 'style') {
            value = this.objToString(value)
        }
        if (caracteristic === 'code') {
            value = "`"+value+"`"
        }
        js = js + "." + caracteristic + " = " + value
        console.log(2, js)
        eval(js)

        this.setState({
            components: newComponents
        })
    }

    objToString(obj) {
        let str = '{'
        Object.keys(obj).forEach( key => {
            if (typeof obj[key] === 'string' && isNaN(obj[key]) && obj[key][0] !== '"') {
                obj[key] = '"'+obj[key]+'"'
            }
            str = str+key+':'+obj[key]+','
        })
        str = str.substring(0, str.length-1) //remove last ,
        str = str+'}'
        return str
    }

    quit = () => {
        this.compile()
        this.props.quit()    
    }

    render() {
        return (
            <div className="code">

                <div id='buildContainer'>

                    <ComponentsVisualizationArea
                        components={this.state.components}
                        getParentState={ () => this.state }
                        setParentState={ newState => this.setState(newState) }
                        getComponent={this.getComponent}
                    />

                    <div id='verticalArea'>
                        <SideBar
                            compile={ () => this.compile() }
                            selectedComponent={this.state.selectedComponent}
                            selectedWindow={this.state.selectedWindow}
                            toggleSelectedWindow={ value => this.setState({ selectedWindow: value }) }
                            getComponent={this.getComponent}
                            setComponent={this.setComponent}
                            setParentState={ newState => this.setState(newState) }
                            quit={this.quit}
                        />

                        {
                            this.state.selectedWindow === 'code' ?
                                <WriteCodeArea
                                    getParentState={ () => this.state }
                                    setParentState={ newState => this.setState(newState) }
                                    code={this.getComponent(this.state.selectedComponent).code}   
                                    setCode={ code => this.setComponent('code', code, this.state.selectedComponent) }
                                />
                            : this.state.selectedWindow === 'style' &&
                                <StyleArea
                                    selectedComponent={this.state.selectedComponent}
                                    getComponent={this.getComponent}
                                    setComponent={this.setComponent}
                                />
                        }
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default CodePage
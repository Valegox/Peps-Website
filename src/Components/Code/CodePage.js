import React from 'react'
import firebase from '../../Firebase/firebase'
import './CodePage.css'
import ComponentsVisualizationArea from './Windows/ComponentsVisualizationArea' 
import WriteCodeArea from './Windows/WriteCodeArea'
import SideBar from './Windows/SideBar'

class CodePage extends React.Component {

    constructor() {
        super()
        this.state = {
            components: {
                Main: {
                    code: 'CONSOLE //afficher la console\n\n//Ecris ton code ici',
                    openedInVisualization: true,
                    childs: {}
                }
            },
            selectedComponent: 'Main',
            selectedWindow: 'code' //if component is visible, nav is displayed and selectedWindow can also be 'style'
        }
    }

    compile() {
        firebase.firestore().collection('users').doc('0Vsmb2SlhgU6QDSUJmhd').update({
            components: this.state.components
        })
    }

    getCode(path) {
        let { components } = this.state

        let js = 'components'

        let arrayPath = path.split('/')

        for (let key of arrayPath) {
            js = js + "['"+key+"'].childs"
        }
        js = js.slice(0, js.length-7) //we remove the last .childs
        js = js + '.code'
        return eval(js)
    }

    setCode(code, path) {
        let newComponents = {...this.state.components}

        let js = "newComponents"

        let arrayPath = path.split('/')

        for (let key of arrayPath) {
            js = js + "[\'"+key+"\'].childs"
        }
        js = js.slice(0, js.length-7) //we remove the last .childs
        js = js + ".code = " + "`"+code+"`"

        eval(js)

        this.setState({
            components: newComponents
        })
    }

    render() {
        return (
            <div className="code">

                <div id='buildContainer'>

                    <ComponentsVisualizationArea
                        components={this.state.components}
                        setParentState={ newState => this.setState(newState) }
                    />

                    <div id='verticalArea'>
                        <SideBar
                            compile={ () => this.compile() }
                            isComponentVisible={this.state.isComponentVisible}
                            toggleComponentVisibility={ value => this.setState({ isComponentVisible: value }) }
                            selectedComponent={this.state.selectedComponent}
                            selectedWindow={this.state.selectedWindow}
                            toggleSelectedWindow={ value => this.setState({ selectedWindow: value }) }
                        />
                        <WriteCodeArea
                            getParentState={ () => this.state }
                            setParentState={ newState => this.setState(newState) }
                            code={this.getCode(this.state.selectedComponent)}   
                            setCode={ code => this.setCode(code, this.state.selectedComponent) }
                        />
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default CodePage
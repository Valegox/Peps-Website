import React from 'react'
import './CodePage.css'
import ComponentsVisualizationArea from './Windows/ComponentsVisualizationArea' 
import WriteCodeArea from './Windows/WriteCodeArea'
import SideBar from './Windows/SideBar'

class CodePage extends React.Component {

    constructor() {
        super()
        this.state = {
            variables: {}
        }
    }

    render() {
        return (
            <div className="code">

                <div id='buildContainer'>
                    <ComponentsVisualizationArea
                    />

                    <WriteCodeArea
                        getParentState={ () => this.state }
                        setParentState={ newState => this.setState(newState) }
                    />

                    <SideBar
                    />
                    
                </div>
            </div>
        )
    }
}

export default CodePage
import React from 'react'
import './ComponentsVisualizationArea.css'

class ComponentsVisualizationArea extends React.Component {

    constructor() {
        super()
        this.state = {
            consoleLogs: [],
            variables: {}
        }
    }

    render() {
        return (
            <div id="componentsVisualizationArea">

                <p>Components visualization</p>
            
            </div>
        )
    }
}

export default ComponentsVisualizationArea
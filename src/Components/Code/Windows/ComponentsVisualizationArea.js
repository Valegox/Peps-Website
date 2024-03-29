import React from 'react'
import './ComponentsVisualizationArea.css'

class ComponentsVisualizationArea extends React.Component {

    _onMouseEnterInComponent = path => {
        let strPath = path.join('/')
        this.props.setParentState({
            componentHoveredByMouse: strPath
        })
    }

    _onMouseLeaveComponent = () => {
        this.props.setParentState({
            componentHoveredByMouse: null
        })
    }

    _onClickOnComponent = path => {
        let strPath = path.join('/')
        this.props.setParentState({ 
            selectedComponent: strPath, 
            selectedWindow: this.props.getComponent(strPath).visible ? this.props.getParentState().selectedWindow : 'code'
        })
    }

    _declareComponent = path => {
        const name = window.prompt('Name (cannot include special characters):', '')

        if (name !== null && name !== '' && !name.includes('/') && !name.includes('.') && name !== 'Main') { 
            const component = "{ name: '" + name + "', code: '', children: {}, visible: false, type: 'area', textContent: '', style: { backgroundColor: '#FFFFFF', position: 'relative', left: 0, bottom: 0, zIndex: 0, transform: [{ rotate: 0 }], opacity: 1, width: '50%', height: '50%', borderWidth: 0, borderColor: '#FFFFFF', margin: 0, padding: 0, borderRadius: 0, flexDirection: 'column', flexWrap: 'nowrap', alignItems: 'flex-start', justifyContent: 'flex-start', color: '#000000', fontSize: 0, fontWeight: 'normal', textDecorationLine: 'none', fontStyle: 'normal', fontFamily: 'Arial' } }"
            this._createComponent(name, component, path)
        }
    }   

    _createComponent = (name, value, path) => {

        let newComponents = {...this.props.components}

        let jsAffectation = 'newComponents'
        for (let key of path) {
            jsAffectation = jsAffectation + "['"+key+"'].children"
        }
        jsAffectation = jsAffectation + "['"+name+"']"
        jsAffectation = jsAffectation + " = " + value
        
        eval(jsAffectation)

        this.props.setParentState({ 
            components: newComponents, 
            selectedWindow: 'code'
        })
    }

    _copyComponent = (path, event) => {
        event.stopPropagation()

        let { components } = this.props
        let jsComponent = 'components'
        for (let key of path) {
            jsComponent = jsComponent + "['"+key+"'].children"
        }
        jsComponent = jsComponent.substring(0, jsComponent.length-9) //we remove last .children

        let component = eval(jsComponent)

        this.props.setParentState({
            copiedComponent: component
        })
    }

    _pasteComponent = (path, event) => {
        event.stopPropagation()
        this._createComponent(this.props.getParentState().copiedComponent.name, JSON.stringify(this.props.getParentState().copiedComponent), path)
    }

    _deleteComponent = (path, event) => {
        event.stopPropagation()
        const confirm = window.confirm('Delete ' + path[path.length-1] + ' ?')

        if (confirm) {
            let newComponents = {...this.props.components}

            let jsAffectation = 'delete newComponents'
            for (let key of path) {
                jsAffectation = jsAffectation + "['"+key+"'].children"
            }
            jsAffectation = jsAffectation.slice(0, jsAffectation.length-9) //we remove the last .children
            
            eval(jsAffectation)

            this.props.setParentState({
                components: newComponents,
                selectedComponent: 'Main',
                selectedWindow: 'code' 
            })   
        }
    }

    _generateSchema = (object, path, marginLeft) => {
        return (
            <div className='item' style={{ marginLeft: marginLeft }}>
                { 
                    Object.keys(object).map( (component, index) => {
                        let newPath = [...path]
                        newPath.push(component)
                        let isHovered = this.props.getParentState().componentHoveredByMouse === newPath.join('/')
                        let displayPasteButton = this.props.getParentState().copiedComponent !== null
                        return (
                            <div 
                                className='uniqueComponent'
                                key={index}
                            >
                                <div
                                    className='nameContainer'
                                    onMouseEnter={ () => this._onMouseEnterInComponent(newPath) } 
                                    onMouseLeave={this._onMouseLeaveComponent}
                                    onClick={ () => this._onClickOnComponent(newPath) }

                                >
                                    <span>
                                        {
                                            Object.keys(object[component].children).length > 0 && '▼'
                                        } 
                                        {component}
                                    </span>

                                    {
                                        isHovered &&
                                            <img 
                                                src={require('../../../img/create_component_icon.png')}
                                                onClick={ () => this._declareComponent(newPath) }
                                            />
                                    }

                                    {
                                        marginLeft !== 0 && isHovered &&
                                            <a onClick={ event => this._copyComponent(newPath, event) }>Copy</a>
                                    }

                                    {
                                        marginLeft !== 0 && isHovered &&
                                            <a onClick={ event => this._deleteComponent(newPath, event) }>Delete</a>
                                    }

                                    {
                                        displayPasteButton && isHovered &&
                                            <a onClick={ event => this._pasteComponent(newPath, event) }>Paste</a>
                                    }

                                </div>

                                <div className='componentsContainer'>
                                    {
                                        object[component].children !== null &&
                                            this._generateSchema(object[component].children, newPath, marginLeft+10) 
                                    }
                                </div>
                            </div>
                        )
                    }) 
                }
            </div>
        )   
    }

    render() {
        return (
            <div id='leftSideContainer'>

                <div id='nameContainer'>
                    <span>Peps</span>
                    <a id='documentation' href='https://github.com/PastequeBuild/Peps/blob/master/README.md' target="_blank">documentation</a>
                </div>

                <div id="componentsVisualizationArea">
                    <div id='mainContainer'>

                        {this._generateSchema(this.props.components, [], 0)}

                    </div>
                </div>
            </div>
        )
    }
}

export default ComponentsVisualizationArea

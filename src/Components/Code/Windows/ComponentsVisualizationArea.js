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

    _onClickOnComponent(path) {
        let strPath = path.join('/')
        this.props.setParentState({ 
            selectedComponent: strPath, 
            selectedWindow: this.props.getComponent(strPath).visible ? this.props.getParentState().selectedWindow : 'code'
        })
    }

    _createComponent(path) {
        const name = window.prompt('Nom du nouveau composant (ne doit pas inclure de / et ne doit pas s\'appeler Main):', '')

        if (name !== null && name !== '' && !name.includes('/')) { 
            let newComponents = {...this.props.components}

            let jsAffectation = 'newComponents'
            for (let key of path) {
                jsAffectation = jsAffectation + "['"+key+"'].childs"
            }
            jsAffectation = jsAffectation + "['"+name+"']"
            jsAffectation = jsAffectation + " = { code: '', openedInVisualization: false, childs: {}, visible: false, type: null, text: '', style: { backgroundColor: '#FFFFFF', opacity: 1, width: '50%', height: '50%', borderWidth: 0, borderColor: '#FFFFFF', margin: 0, padding: 0, borderRadius: 0, flexDirection: 'column', flexWrap: 'nowrap', alignItems: 'flex-start', justifyContent: 'flex-start', color: '#000000', fontSize: 0, fontWeight: 'normal', textDecorationLine: 'none', fontStyle: 'normal', fontFamily: 'Arial' } }"
            
            eval(jsAffectation)

            this.props.setParentState({ 
                components: newComponents, 
                selectedWindow: 'code'
            })
        }
    }

    _deleteComponent(path, event) {
        event.stopPropagation()
        const confirm = window.confirm('Supprimer le composant ' + path[path.length-1] + ' ?')

        if (confirm) {
            let newComponents = {...this.props.components}

            let jsAffectation = 'delete newComponents'
            for (let key of path) {
                jsAffectation = jsAffectation + "['"+key+"'].childs"
            }
            jsAffectation = jsAffectation.slice(0, jsAffectation.length-7) //we remove the last .childs
            
            eval(jsAffectation)

            this.props.setParentState({
                components: newComponents,
                selectedComponent: 'Main',
                selectedWindow: 'code' 
            })   
        }
    }

    _generateSchema(object, path, marginLeft) {
        return (
            <div className='item' style={{ marginLeft: marginLeft }}>
                { 
                    Object.keys(object).map( (component, index) => {
                        let newPath = [...path]
                        newPath.push(component)
                        return (
                            <div className='uniqueComponent' key={index}>
                                <div className='nameContainer' onClick={ () => this._onClickOnComponent(newPath) }>
                                    <span>
                                        {
                                            Object.keys(object[component].childs).length > 0 && '▼'
                                        } 
                                        {component}
                                    </span>

                                    <img 
                                        src={require('../../../img/create_component_icon.png')}
                                        onClick={ () => this._createComponent(newPath) }
                                    />

                                    {
                                        marginLeft !== 0 &&
                                            <a onClick={ event => this._deleteComponent(newPath, event) }>Supprimer</a>
                                    }

                                </div>

                                <div className='componentsContainer'>
                                    {
                                        object[component].childs !== null &&
                                            this._generateSchema(object[component].childs, newPath, marginLeft+10) 
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

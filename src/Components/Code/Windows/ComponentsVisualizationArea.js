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
        this.props.setParentState({ selectedComponent: strPath })
    }

    _createComponent(path) {
        const name = window.prompt('Nom du nouveau composant (ne doit pas inclure de /):', '')

        if (name !== null && name !== '' && !name.includes('/')) { 
            let newComponents = {...this.props.components}

            let jsAffectation = 'newComponents'
            for (let key of path) {
                jsAffectation = jsAffectation + "['"+key+"'].childs"
            }
            jsAffectation = jsAffectation + "['"+name+"']"
            jsAffectation = jsAffectation + " = { code: '', openedInVisualization: false, childs: {} }"
            
            eval(jsAffectation)

            this.props.setParentState({ components: newComponents })
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
                selectedComponent: 'Main', 
                components: newComponents 
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

        /*const example = {
            Main: {
                content: {
                    homePage: {
                        content: {
                            title: {
                                content: null,
                            },
                            levelScroll: {
                                content: {
                                    levelList: {
                                        content: {
                                            levelButton: {
                                                content: {
                                                    lockIcon: {
                                                        content: null
                                                    },
                                                    levelNumber: {
                                                        content: null
                                                    }
                                                },
                                                opened: false
                                            },
                                            levelButton: {
                                                content: {
                                                    lockIcon: {
                                                        content: null
                                                    },
                                                    levelNumber: {
                                                        content: null
                                                    }
                                                },
                                                opened: false
                                            },
                                            levelButton: {
                                                content: {
                                                    lockIcon: {
                                                        content: null
                                                    },
                                                    levelNumber: {
                                                        content: null
                                                    }
                                                },
                                                opened: false
                                            }
                                        }
                                    }
                                },
                                opened: false
                            },
                            playButton: {
                                content: {
                                    playText: {
                                        content: null
                                    }
                                }
                            }
                        },
                        opened: true
                    },
                    Game: {
                        content: {
                            losePage: {
                                content: null
                            },
                            adsArea: {
                                content: null
                            },
                            background: {
                                content: {
                                    level1: {
                                        content: {
                                            dropZone: {
                                                content: null
                                            }
                                        }
                                    },
                                    level2: {
                                        content: {
                                            dropZone: {
                                                content: null
                                            }
                                        }
                                    },
                                    level3: {
                                        content: {
                                            dropZone: {
                                                content: null
                                            }
                                        }
                                    }
                                },
                                opened: false
                            },
                            ballList: {
                                content: {
                                    ball: {
                                        content: null
                                    },
                                    ball: {
                                        content: null
                                    },
                                    ball: {
                                        content: null
                                    }
                                },
                                opened: false
                            }
                        },
                        opened: false
                    }
                },
                opened: true
            }
        }*/

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
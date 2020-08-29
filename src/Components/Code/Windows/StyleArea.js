import React from 'react'
import './StyleArea.css'

class StyleArea extends React.Component {

    _updateStyle(property, value) {
        const { style } = {...this.props.getComponent(this.props.selectedComponent)}

        let newStyle = {...style}

        if (value[0] === '0') {
            value = value.substring(1, value.length)
        }
        if (value.length === 0) {
            value = '0'
        }

        newStyle[property] = value

        //bug workaround
        if (property !== 'transform') {
            newStyle.transform = ["[{ rotate: '" + style.transform[0].rotate + "' }]"]
        }

        this.props.setComponent('style', newStyle, this.props.selectedComponent)
    }

    render() {
        const { style } = {...this.props.getComponent(this.props.selectedComponent)}

        return (
            <div id="styleArea">

                <div className='line'>
                    <span>Type de composant</span>  
                    <select
                        name="type"
                        size="1"
                        value={this.props.getComponent(this.props.selectedComponent).type}
                        onChange={ e => this.props.setComponent('type', '"'+e.target.value+'"', this.props.selectedComponent)}
                    >
                        <option value='area'>Aire</option>
                        <option value='text'>Texte</option>
                    </select> 
                </div>

                {
                    this.props.getComponent(this.props.selectedComponent).type === 'area' ?   
                        <div>
                            <div className='line'>
                                <span>Couleur de fond</span>  
                                <input 
                                    type='color' 
                                    value={style.backgroundColor}
                                    onChange={ e => this._updateStyle('backgroundColor', e.target.value) }
                                />

                                <span>Transparent</span>
                                <input 
                                    type='checkbox'
                                    checked={style.backgroundColor === 'transparent'}
                                    onChange={ e => this._updateStyle('backgroundColor', style.backgroundColor === 'transparent' ? '#FFFFFF' : 'transparent') }
                                />
                            </div>

                            <div className='line'>
                                <span>Type de position</span>  
                                <select 
                                    name="position-type" 
                                    size="1"
                                    value={style.position}
                                    onChange={ e => this._updateStyle('position', e.target.value) }
                                >
                                    <option value="relative">Relative</option>
                                    <option value="absolute">Absolue</option>
                                </select>
                            </div>

                            <div className='subLines'>
                                <div className='line'>
                                    <span>X (position horizontale)</span>  
                                    <input
                                        type='text'
                                        value={style.left}
                                        onChange={ e => this._updateStyle('left', e.target.value) }
                                    />
                                </div>

                                <div className='line'>
                                    <span>Y (position verticale)</span>  
                                    <input
                                        type='text'
                                        value={style.bottom}
                                        onChange={ e => this._updateStyle('bottom', e.target.value) }
                                    />
                                </div>

                                <div className='line'>
                                    <span>Z (niveau de superposition avec les autres composants)</span>  
                                    <input
                                        type='text'
                                        value={style.zIndex}
                                        onChange={ e => this._updateStyle('zIndex', e.target.value) }
                                    />
                                </div>
                            </div>

                            <div className='line'>
                                <span>Rotation (en radians)</span>
                                <input 
                                    type='number' 
                                    value={style.transform[0].rotate}
                                    onChange={ e => this._updateStyle('transform', ["[{ rotate: '"+ e.target.value + "' }]"]) }
                                />
                            </div>

                            <div className='line'>
                                <span>Opacité (de 0 à 1)</span>  
                                <input 
                                    type='number' 
                                    value={parseFloat(style.opacity)}
                                    onChange={ e => this._updateStyle('opacity', parseFloat(e.target.value)) }
                                />
                            </div>

                            <div className='line'>
                                <span>Largeur</span>  
                                <input
                                    type='text'
                                    value={style.width}
                                    onChange={ e => this._updateStyle('width', e.target.value)}
                                />
                            </div>

                            <div className='line'>
                                <span>Hauteur</span>  
                                <input
                                    type='text'
                                    value={style.height}
                                    onChange={ e => this._updateStyle('height', e.target.value) }
                                />
                            </div>

                            <div className='line'>
                                <span>Epaisseur des bordures</span>  
                                <input
                                    type='number'
                                    value={style.borderWidth}
                                    onChange={ e => this._updateStyle('borderWidth', e.target.value) }
                                />
                            </div>

                            <div className='line'>
                                <span>Couleur des bordures</span>  
                                <input 
                                    type='color' 
                                    value={style.borderColor}
                                    onChange={ e => this._updateStyle('borderColor', e.target.value) }
                                />
                            </div>

                            <div className='line'>
                                <span>Marge extérieure aux bordures</span>  
                                <input
                                    type='text'
                                    value={style.margin}
                                    onChange={ e => this._updateStyle('margin', e.target.value) }
                                />
                            </div>

                            <div className='line'>
                                <span>Marge intérieure aux bordures</span>  
                                <input
                                    type='text'
                                    value={style.padding}
                                    onChange={ e => this._updateStyle('padding', e.target.value) }
                                />
                            </div>

                            <div className='line'>
                                <span>Arrondi aux angles</span>  
                                <input
                                    type='text'
                                    value={style.borderRadius}
                                    onChange={ e => this._updateStyle('borderRadius', e.target.value) }
                                />
                            </div>

                            <div className='line'>
                                <span>Direction des composants enfants</span>  
                                <select 
                                    name="flex-direction" 
                                    size="1"
                                    value={style.flexDirection}
                                    onChange={ e => this._updateStyle('flexDirection', e.target.value.length < 1 ? '0' : e.target.value) }
                                >
                                    <option value="column">Vertical</option>
                                    <option value="row">Horizontal</option>
                                </select>
                            </div>

                            <div className='line'>
                                <span>Comportement des composants enfants lorsqu'ils dépassent le composant parent</span>  
                                <select 
                                    name="flex-wrap" 
                                    size="1"
                                    value={style.flexWrap}
                                    onChange={ e => this._updateStyle('flexWrap', e.target.value) }
                                >
                                    <option value="nowrap">Dépasser</option>
                                    <option value="wrap">Retour à la ligne</option>
                                    <option value="wrap-reverse">Retour à la ligne inversé</option>
                                </select>
                            </div>

                            {
                                !(style.flexDirection === 'column' && style.flexWrap !== 'nowrap') ?
                                    <div className='subLines'>
                                        <div className='line'>
                                            <span>Alignement horizontal des composants enfants</span>  
                                            <select 
                                                name="horizontal-alignment" 
                                                size="1"
                                                value={style.flexDirection === 'column' ? style.alignItems : style.justifyContent}
                                                onChange={ e => this._updateStyle(style.flexDirection === 'column' ? 'alignItems' : 'justifyContent', e.target.value) }
                                            >
                                                <option value="flex-start">Tout à gauche</option>
                                                <option value="center">Tout centré</option>
                                                <option value="flex-end">Tout à droite</option>
                                                <option value="space-around">Espace autour des composants</option>
                                                <option value="space-between">Espace entre les composants</option>
                                            </select>
                                        </div>
                                    </div>
                                :
                                    <div className='subLines'> 
                                        <div className='line'>
                                            <span>Il faut mettre "comportement des composants enfants lorsqu'ils dépassent le composant parent" sur "Dépasser" pour pouvoir paramétrer l'alignement horizontal des composants enfants.</span>
                                        </div>
                                    </div>
                            }

                            {
                                /*!(style.flexDirection === 'row' && style.flexWrap !== 'nowrap') ?*/}
                                    <div className='subLines'>
                                        <div className='line'>
                                            <span>Alignement vertical des composants enfants</span>  
                                            <select 
                                                name="vertical-alignment" 
                                                size="1"
                                                value={style.flexDirection === 'column' ? style.justifyContent : style.alignItems}
                                                onChange={ e => this._updateStyle(style.flexDirection === 'column' ? 'justifyContent' : 'alignItems', e.target.value) }
                                            >
                                                <option value="flex-start">Tout en haut</option>
                                                <option value="center">Tout centré</option>
                                                <option value="flex-end">Tout en bas</option>
                                                <option value="space-around">Espace autour des composants</option>
                                                <option value="space-between">Espace entre les composants</option>
                                            </select>
                                        </div>
                                    </div>
                            {/*    :
                                    <div className='subLines'>
                                        <div className='line'>
                                            <span>Il faut mettre "comportement des composants enfants lorsqu'ils dépassent le composant parent" sur "Dépasser" pour pouvoir paramétrer l'alignement vertical des composants enfants.</span>
                                        </div>
                                    </div>
                            */}
                        </div>
                    :
                        <div>

                            <div className='line'>
                                <span>Texte</span>  
                                <input
                                    type='text'
                                    value={this.props.getComponent(this.props.selectedComponent).textContent}
                                    onChange={ e => this.props.setComponent('textContent', '"'+e.target.value+'"', this.props.selectedComponent)}
                                />
                            </div>

                            <div className='line'>
                                <span>Couleur</span>  
                                <input 
                                    type='color' 
                                    value={style.color}
                                    onChange={ e => this._updateStyle('color', e.target.value) }
                                />
                            </div>

                            <div className='line'>
                                <span>Type de position</span>  
                                <select 
                                    name="position-type" 
                                    size="1"
                                    value={style.position}
                                    onChange={ e => this._updateStyle('position', e.target.value) }
                                >
                                    <option value="relative">Relative</option>
                                    <option value="absolute">Absolue</option>
                                </select>
                            </div>

                            <div className='subLines'>
                                <div className='line'>
                                    <span>X (position horizontale)</span>  
                                    <input
                                        type='number'
                                        value={style.left}
                                        onChange={ e => this._updateStyle('left', e.target.value) }
                                    />
                                </div>

                                <div className='line'>
                                    <span>Y (position verticale)</span>  
                                    <input
                                        type='number'
                                        value={style.bottom}
                                        onChange={ e => this._updateStyle('bottom', e.target.value) }
                                    />
                                </div>

                                <div className='line'>
                                    <span>Z (niveau de superposition avec les autres composants)</span>  
                                    <input
                                        type='number'
                                        value={style.zIndex}
                                        onChange={ e => this._updateStyle('zIndex', e.target.value) }
                                    />
                                </div>
                            </div>

                            <div className='line'>
                                <span>Taille</span>  
                                <input 
                                    type='number' 
                                    value={parseFloat(style.fontSize)}
                                    onChange={ e => this._updateStyle('fontSize', parseFloat(e.target.value)) }
                                />
                            </div>

                            <div className='line'>
                                <span>Epaisseur</span>  
                                <select 
                                    name="font-weight" 
                                    size="1"
                                    value={style.fontWeight === '200' ? '"200"' : style.fontWeight}
                                    onChange={ e => this._updateStyle('fontWeight', e.target.value) }
                                >
                                    <option value="normal">Normal</option>
                                    <option value="bold">Gras</option>
                                    <option value='"200"'>Fin</option>
                                </select>
                                <span className='note'>Certaines polices d'écritures ne sont pas compatibles avec certaines épaisseurs</span>
                            </div>

                            <div className='line'>
                                <span>Soulignage</span>  
                                <select 
                                    name="text-decoration" 
                                    size="1"
                                    value={style.textDecorationLine}
                                    onChange={ e => this._updateStyle('textDecorationLine', e.target.value) }
                                >
                                    <option value="none">Non</option>
                                    <option value="underline">Oui</option>
                                </select>
                            </div>

                            <div className='line'>
                                <span>Italique</span>  
                                <select 
                                    name="font-style" 
                                    size="1"
                                    value={style.fontStyle}
                                    onChange={ e => this._updateStyle('fontStyle', e.target.value) }
                                >
                                    <option value="normal">Non</option>
                                    <option value="italic">Oui</option>
                                </select>
                            </div>

                            <div className='line'>
                                <span>Police d'écriture</span>  
                                <select 
                                    name="font-family" 
                                    size="1"
                                    value={style.fontFamily}
                                    onChange={ e => this._updateStyle('fontFamily', e.target.value) }
                                >
                                    <option value='undefined'>Par défaut</option>
                                    <option value="Arial" id='Arial'>Arial</option>
                                    <option value="Georgia" id='Georgia'>Georgia</option>
                                </select>
                            </div>
                       

                            <div className='line'>
                                <span>Marge extérieure aux bordures</span>  
                                <input
                                    type='text'
                                    value={style.margin}
                                    onChange={ e => this._updateStyle('margin', e.target.value) }
                                />
                            </div>
                        </div>
                }
            </div>
        )
    }
}

export default StyleArea

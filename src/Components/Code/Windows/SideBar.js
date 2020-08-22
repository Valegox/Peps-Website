import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact'
import './SideBar.css'

class SideBar extends React.Component {

    _toggleVisibility(checked) {
        this.props.setParentState({ selectedWindow: 'code' })
        this.props.setComponent('type', '"area"', this.props.selectedComponent)
        this.props.setComponent('visible', checked, this.props.selectedComponent)
    }

    render() {
        return (
            <div id="sideBar">

                <div id='left'>
                    <div 
                        className="text-center mt-0" 
                        id='compileButtonContainer'
                        onClick={ () => this.props.compile() }
                    >
                        <MDBBtn color="indigo" type="submit">▶ Run</MDBBtn>
                    </div>

                    <div id='componentArea'>
                        <div id='componentNameContainer'>
                            <span>{this.props.selectedComponent}</span>
                        </div>

                        {
                            this.props.getComponent(this.props.selectedComponent).visible !== null &&
                                <div id='visibleContainer'>
                                    <span>visible</span>
                                    <input 
                                        type='checkbox'
                                        checked={this.props.getComponent(this.props.selectedComponent).visible}
                                        onChange={ e => this._toggleVisibility(e.target.checked) }
                                    />
                                </div>
                        }

                {
                    this.props.getComponent(this.props.selectedComponent).visible === true &&
                        <nav>
                            <div 
                                className='button' 
                                onClick={ () => this.props.toggleSelectedWindow('code') }
                                style={ this.props.selectedWindow === 'code' ? { borderBottom: '5px lightgray solid', fontWeight: '500' } : {} }
                            >
                                <span>CODE</span>
                            </div>

                            <div id='border' />

                            <div 
                                className='button' 
                                onClick={ () => this.props.toggleSelectedWindow('style') }
                                style={ this.props.selectedWindow === 'style' ? { borderBottom: '5px lightgray solid', fontWeight: '500' } : {} }
                            >
                                <span>STYLE</span>
                            </div>                            
                        </nav>
                }
                    </div>
                </div>

                <div 
                    className="text-center mt-0" 
                    onClick={ () => this.props.compile() }
                >
                    <MDBBtn 
                        color="indigo" 
                        onClick={ () => this.props.quit() }
                    >
                        Quit
                    </MDBBtn>
                </div>

            </div>
        )
    }
}

export default SideBar
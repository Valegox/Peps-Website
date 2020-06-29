import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact'
import './SideBar.css'

class SideBar extends React.Component {

    render() {
        return (
            <div id="sideBar">

                <div id='left'>
                    <div 
                        className="text-center mt-0" 
                        onClick={ () => this.props.compile() }
                    >
                        <MDBBtn color="indigo" type="submit">▶ Compiler</MDBBtn>
                    </div>

                    <div id='componentArea'>
                        <div id='componentNameContainer'>
                            <span>{this.props.selectedComponent}</span>
                        </div>

                        <div id='visibleContainer'>
                            <span>visible</span>
                            <input 
                                type='checkbox'
                                value={this.props.isComponentVisible}
                                onChange={ e => this.props.toggleComponentVisibility(e.target.checked) }
                            />
                        </div>
                    </div>
                </div>

                {
                    this.props.isComponentVisible &&
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

                <div 
                    className="text-center mt-0" 
                    onClick={ () => this.props.compile() }
                >
                    <MDBBtn color="indigo" type="submit">Quitter</MDBBtn>
                </div>

            </div>
        )
    }
}

export default SideBar
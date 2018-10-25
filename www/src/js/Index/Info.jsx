import React, { Component } from 'react';

class Info extends Component {
	paras = this.props.paras;

	render() {
		return (
			<React.Fragment>
				<h1>FaceGA</h1>
				<p>
				FaceGA is an experiment I'm made to use a genetic algorithm to find the face you find most attractive. You select faces until you are satisfied with the results. The Faces are produced by an autoencoder. I probably need to improve the autoencoder.
				</p>
				<button className='btn btn-primary info-button' onClick={() => this.paras.jump('Evolve', {type: 'start', gender: 'f'})}>Female Autoencoder</button>
				<button className='btn btn-primary info-button' onClick={() => this.paras.jump('Evolve', {type: 'start', gender: 'm'})}>Male Autoencoder</button>
			</React.Fragment>
		);
	}
}
 
export default Info;
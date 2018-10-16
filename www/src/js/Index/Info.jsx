import React, { Component } from 'react';

class Info extends Component {
	paras = this.props.paras;

	render() {
		return (
			<React.Fragment>
				<h1>FaceGA</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus, justo sit amet bibendum hendrerit, orci ipsum tempus enim, in condimentum erat elit ac tellus. Etiam tellus nulla, dapibus in tempor in, feugiat eget sapien. Vestibulum rutrum ex leo, non molestie tellus vulputate facilisis. Aliquam ipsum tellus, luctus quis volutpat ac, fermentum et dolor. Ut non nisl sed massa porttitor dictum. In vehicula gravida velit at dignissim. Curabitur nec maximus quam. Ut tempus neque quis dui venenatis, eget fringilla nulla molestie. Etiam finibus, nulla sed eleifend efficitur, tellus dolor ultricies felis, at sagittis est odio vitae lectus. Sed at lobortis turpis. Fusce eget venenatis dolor. Morbi ac scelerisque ante.</p>
				<button className='btn btn-primary info-button' onClick={() => this.paras.jump('Evolve', {type: 'start', gender: 'f'})}>Female Autoencoder</button>
				<button className='btn btn-primary info-button' onClick={() => this.paras.jump('Evolve', {type: 'start', gender: 'm'})}>Male Autoencoder</button>
			</React.Fragment>
		);
	}
}
 
export default Info;
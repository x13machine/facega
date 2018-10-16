import React, { Component } from 'react';

class Faces extends Component {
	state = { 
		faces: []
	}

	add(faces,reset){
		if(reset)this.state.faces = [];
		this.state.faces = this.state.faces.concat(faces);
		this.setState(this.state);
	}

	render() { 
		return (
			<main id='faces' class='col bg-faded py-3'>
				{ this.state.faces.map(face => (
					<div key={face.uid} className='faces'>
						<img src={'/i/' + face.uid + '.jpg'}/>
					</div>
				))}
			</main> 
		);
	}
}
 
export default Faces;
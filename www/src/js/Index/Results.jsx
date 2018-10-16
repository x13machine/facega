import React, { Component } from 'react';
import autoBind from 'react-autobind';


class Results extends Component {
	paras = this.props.paras;
	state = {
		submited: false,
		face: {}
	}

	jump(data){
		var data = data || {};
		if(data.type === 'submited'){
			this.state.submited = true;
		}else if(data.type === 'evolve'){
			this.state.submited = false;
			this.state.face = data.face;
		}
		
		this.setState(this.state);
	}
	constructor(){
		super(...arguments);
		autoBind(this);
	}

	render() { 
		return (
			<React.Fragment>
				<h1>Results</h1>
				<p style={{display: this.state.submited ? 'block' : 'none'}}>The image was of successfully submited.</p>
				<img src={'data:image/jpg;base64,' + (this.state.face.img || '')}/>
				<button className='btn btn-primary m-0' onClick={() => this.paras.jump('Evolve')}>Back</button> 
				<button
					className='btn btn-primary m-0'
					onClick={() => this.paras.jump('Submit', this.state.face)}
					style={{display: this.state.submited ? 'none' : 'block'}}>Submit Results</button> 
			</React.Fragment>
		);
	}
}
 
export default Results;
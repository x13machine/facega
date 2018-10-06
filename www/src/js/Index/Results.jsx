import React, { Component } from 'react';

class Results extends Component {
	paras = this.props.paras;
	state = {
		submited: false
	}

	jump(data){
		if(data.type === 'submited'){
			this.state.submited = true;
		}else if(data.type === 'evolve'){
			this.state.src = data.src;
		}
		
		this.setState(this.state);
	}
	constructor(){
		super(...arguments);
		this.jump = this.jump.bind(this);
	}
	
	render() { 
		return (
			<React.Fragment>
				<h1>Results</h1>
				<p style={{display: this.state.submited ? 'block' : 'none'}}>The image was of successfully submited.</p>
				<img src={this.state.src}/>
				<button className='btn btn-primary m-0' onClick={() => this.paras.jump('Evolve')}>Back</button> 
				<button
					className='btn btn-primary m-0'
					onClick={() => this.paras.jump('Submit')}
					style={{display: this.state.submited ? 'none' : 'block'}}>Submit Results</button> 
			</React.Fragment>
		);
	}
}
 
export default Results;
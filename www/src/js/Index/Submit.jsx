import React, { Component } from 'react';
import autoBind from 'react-autobind';
import Cookies from 'js-cookie';


class Submit extends Component {
	paras = this.props.paras;
	state = {
		choices: Object.values(jsData.choices).filter(choice => 'question' in choice).map((choice, index) => {
			choice.value = choice.default;
			choice.index = index;
			return choice;
		}),
		face: {},
		understand: false
	}
	
	constructor(){
		super(...arguments);
		autoBind(this);
	}

	update(e, index){
		this.state.choices[index].value = e.target.value;
		this.setState(this.state);
	}

	understandUpdate(e) {
		this.state.understand = !this.state.understand;
		this.setState(this.state);
	}

	submit(){
		var choices = {};
		this.state.choices.forEach(choice => {
			choices[choice.key] = choice.value;
		});
		
		$.ajax('/rest/submitface', {
			type: 'POST',
			data: JSON.stringify({
				choices: choices,
				gender: this.state.face.gender,
				parameters: this.state.face.parameters
			}),
			contentType: 'application/json; charset=utf-8',
			headers:{
				'X-CSRFToken': Cookies.get('csrftoken')
			},
			dataType: 'json',
			success: () => {
				this.paras.jump('Results', {
					'type': 'submit'
				});
			}
		});


	}

	jump(face){
		this.state.face = face;
		this.setState(this.state);
	}

	render() {
		return (
			<React.Fragment>
				<h1>Submit Form</h1>
				
				{this.state.choices.map(choice => <div key={choice.key} className='form-group'>
					<b>{choice.question} </b>
					<select value={choice.value} onChange={e => this.update(e, choice.index)} className='form-control'>
						{choice.options.map(option => <option key={option[0]} value={option[0]}>{option[1] === 'Unknown' ? 'Prefer not to say' : option[1]}</option>)}
					</select>
				</div>)}
				<input type='checkbox' onChange={this.understandUpdate}/>
				<b> I understand that this infomation will be publicly available.</b><br/>
				<button className='btn btn-primary m-0' onClick={this.submit} disabled={!this.state.understand}>Submit</button> 
			</React.Fragment>
		);
	}
}
 
export default Submit;
import React, { Component } from 'react';
import Cookies from 'js-cookie';

class Submit extends Component {
	state = { 
		choices: Object.values(jsData.choices).filter(choice => 'question' in choice).map((choice, index) => {
			choice.value = choice.default;
			choice.index = index;
			return choice;
		}),
		face: {},
		understand: false
	}
	
	update(self,e, index){
		this.state.choices[index].value = e.target.value;
		this.setState(this.state);
	}

	understandUpdate(e) {
		this.understand = (e.target.value !== 't');
		this.setState(this.state);
	}

	submit(){
		var choices = {};
		this.state.choices.array.forEach(choice => {
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

	render() { 
		return (
			<React.Fragment>
				<h1>Submit Form</h1>
				
				{this.state.choices.map(choice => <div key={choice.key}>
					<b>{choice.question} </b>
					<select value={choice.value} onChange={e => this.update(this, e, choice.index)}>
						{choice.options.map(option => <option key={option[0]} value={option[0]}>{option[1] === 'Unknown' ? 'Prefer not to say' : option[1]}</option>)}
					</select>
				</div>)}
				<input type='checkbox' onChange={this.understandUpdate} value='t' checked={this.understand ? true : null}/>
				<b> I understand that this infomation will be publicly available.</b><br/>
				<button className='btn btn-primary m-0' onClick={this.submit}>Submit</button> 
			</React.Fragment>
		);
	}
}
 
export default Submit;
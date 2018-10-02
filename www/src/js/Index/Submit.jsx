import React, { Component } from 'react';

class Submit extends Component {
	state = { 
		choices: Object.values(jsData.choices).filter(choice => 'question' in choice).map((choice, index) => {
			choice.value = choice.default;
			choice.index = index;
			return choice;
		}),
		understand: false
	}
	
	update(self,e, index){
		console.log(this)
		this.state.choices[index].value = e.target.value;
		this.setState(this.state);
	}

	understandUpdate(e) {
		this.understand = (e.target.value !== 't');
		this.setState(this.state);
	}

	submit(){
		this.paras.jump('Results', {
			'type': 'submit'
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
import React, { Component } from 'react';

class Options extends Component {
	state = {
		choices: []
	}

	update(e, index){
		this.state.choices[index].value = e.target.value;
		this.setState(this.state);
		this.props.update(this.choices2obj());
	}

	constructor(){
		super(...arguments);
		var i = 0;
		var params = new URLSearchParams(location.search);

		for(var key in jsData.choices){
			var choice = jsData.choices[key];
			choice.options.push(['-', 'Any']);
			this.state.choices.push({
				key: key,
				value: params.get(key) ||'-',
				index: i,
				name: choice.name,
				options: choice.options
			});
			
			i++;
		}

		this.props.update(this.choices2obj());
	}


	choices2obj(){
		var obj = obj || {};
		this.state.choices.forEach((choice) =>{
			if(choice.value !== '-')obj[choice.key] = choice.value;
		});

		return obj;
	}

	render() {
		var ser = $.param(this.choices2obj());
		history.pushState(null, null, ser === '' ? '' : '?' + ser);

		return (
			<div>
				{ this.state.choices.map(choice => (
					<div key={choice.key}>
						<b>{choice.name}: </b>
						<select value={choice.value} onChange={(e) => this.update(e,choice.index)}>
							{ choice.options.map(option => (
								<option key={option[0]} value={option[0]}>
									{option[1]}
								</option>
							))}
						</select>
					</div>
				))}
			</div>
		);
	}
}
 
export default Options;
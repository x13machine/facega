import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Info from './Index/Info';
import Evolve from './Index/Evolve';
import Results from './Index/Results';
import Submit from './Index/Submit';

window.random = (min, max) => {
	return Math.random() * (max - min) + min;
}

window.bindFunctions = (obj) => {
	for(var i in obj){
		if(typeof obj[i] === 'function')obj[i] = obj[i].bind(obj);
	}
}

class Index extends Component {
	pages = {
		'Info': React.createRef(),
		'Evolve': React.createRef(),
		'Results': React.createRef(),
		'Submit': React.createRef()
    }
    
	state = {
		page: 'Info'
	}

	jump(page, data){
		(this.pages[page].current.jump || (() => {}))(data)
		this.state.page = page;
		this.setState(this.state);
	}

	render() {
		window.pages = this.pages;
		var paras = {
			jump: (page,data) => this.jump(page,data)
		}

		return (
			<React.Fragment>
				<div id='Info' style={{display: this.state.page === 'Info' ? 'block': 'none'}}><Info paras={paras} ref={this.pages.Info}/></div>
				<div id='Evolve' style={{display: this.state.page === 'Evolve' ? 'block': 'none'}}><Evolve paras={paras} ref={this.pages.Evolve}/></div>
				<div id='Results' style={{display: this.state.page === 'Results' ? 'block': 'none'}}><Results paras={paras} ref={this.pages.Results}/></div>
				<div id='Submit' style={{display: this.state.page === 'Submit' ? 'block': 'none'}}><Submit paras={paras} ref={this.pages.Submit}/></div>
			</React.Fragment>
		);
	}
}

ReactDOM.render(<Index/>, $('#ga').get()[0]);
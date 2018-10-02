import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Info from './Index/Info';
import Evolve from './Index/Evolve';
import Results from './Index/Results';
import Submit from './Index/Submit';


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
		var paras = {
			jump: (page,data) => this.jump(page,data)
		}

		return (
			<React.Fragment>
				<div id='Info' ref={this.pages.Info} style={{display: this.state.page === 'Info' ? 'block': 'none'}}><Info paras={paras}/></div>
				<div id='Evolve' ref={this.pages.Evolve} style={{display: this.state.page === 'Evolve' ? 'block': 'none'}}><Evolve paras={paras}/></div>
				<div id='Results' ref={this.pages.Results} style={{display: this.state.page === 'Results' ? 'block': 'none'}}><Results paras={paras}/></div>
				<div id='Submit' ref={this.pages.Submit} style={{display: this.state.page === 'Submit' ? 'block': 'none'}}><Submit paras={paras}/></div>
			</React.Fragment>
		);
	}
}

ReactDOM.render(<Index/>, $('#ga').get()[0]);
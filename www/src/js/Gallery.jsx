import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Options from './Gallery/Options';
import Faces from './Gallery/Faces';

class Gallery extends Component {
	state = { 
		'options': {}
	}

	elements = {
		'options': React.createRef(),
		'faces': React.createRef()
	}

	optionUpdate(options){
		this.state.options = options;
		var ajax = (reset) => {
			$.getJSON('/rest/listfaces', options, (json) => {
				this.elements['faces'].current.add(json.faces,reset);
				this.state.options.rid = json.rid;
			});
		}

		window.onscroll = (ev) => {
			if($(window).scrollTop() + $(window).height() == $(document).height())ajax(false);
		}
		
		ajax(true);
	}

	render() { 
		return (
			<React.Fragment>
				<Options ref={this.elements.options} update={(options) => this.optionUpdate(options)}/>
				<Faces ref={this.elements.faces}/>
			</React.Fragment>
		);
	}
}

ReactDOM.render(<Gallery/>, $('#gallery').get()[0]);
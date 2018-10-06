import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { base64StringToBlob } from 'blob-util';
import FileSaver from 'file-saver';

function random(min, max) {
	return Math.random() * (max - min) + min;
}

class Evolve extends Component {
	paras = this.props.paras;

	state = {
		gender: '',
		faces: [],
		selected: {},
		history: [],
		active: null,
		epoch: 0
	}
	
	range = 3;
	count = 9;
	parameters = 300;
	change = 1;
	
	next() {

		var breed = Object.keys(this.state.selected);

		if(breed.length === 0){
			this.state.epoch++;
			this.restore(this.state.history[this.state.epoch - 1]);
			return ;
        }
        
        var dif = this.state.history.length - this.state.epoch;
        if(dif !== 0){ //checks if the history length and epoch are inequal.
            this.state.history.splice(this.state.history.length - dif, dif);
        }

		//breeds the faces
		var each = ~~(this.count / breed.length);
		var remainder = this.count % breed.length;
		
		
		
		var breedFace = (parent) => {
			var face = [];
			
			parent.forEach((dp) => {
				face.push(Math.max(Math.min(dp + random(-this.change, this.change),20),-20).toFixed(4) * 1);
			});
			
			return face;
		}

		var newFaces = [];
		breed.forEach((id) => {
			for(var i = 0; i< each; i++){
				newFaces.push(breedFace(this.state.faces[id].parameters));
			}
		});
		
		for(var i = 0; i < remainder; i++){
			newFaces.push(breedFace(this.state.faces[~~random(0,breed.length)].parameters));
		}

		newFaces.sort((a, b) => {return 0.5 - Math.random()});

		newFaces.forEach((face, i) => {
			this.state.faces[i].parameters = face
		});

		this.state.selected = {};
		this.setState(this.state);
		this.update();
	}

	restore(state){
		state.forEach((face_,i) => {
			var face = this.state.faces[i];
			face.mode = '';
			face.img = face_.img;
			face.parameters = face_.parameters;
		});
		this.setState(this.state);
	}
	
	back(){
		this.state.epoch--;
		this.restore(this.state.history[this.state.epoch - 1]);
	}

	update(){
		var faces = [];
		this.state.faces.forEach((face) => {
			faces.push(face.parameters);
		});

		$.ajax('/rest/face', {
			type: 'POST',
			data: JSON.stringify({
				gender: this.state.gender,
				faces: faces
			}),
			contentType: 'application/json; charset=utf-8',
			headers:{
				'X-CSRFToken': Cookies.get('csrftoken')
			},
			dataType: 'json',
			success: (imgs) => {
				imgs.forEach((base,i) => {
					var face = this.state.faces[i];
					face.mode = '';
					face.img = base;
				});
				
				this.state.epoch++;
				this.state.history.push(JSON.parse(JSON.stringify(this.state.faces)));
				this.setState(this.state);
			}	
		});
	}
	
	click(key){

		var face = this.state.faces[key];
		var selected = face.mode === '';
		face.mode = selected ? 'active' : '';
		if(selected){
			this.state.selected[key] = true;
			this.state.active = key;
		}else{
			this.state.active = null;
			delete this.state.selected[key];
		}
		
		this.state.faces.forEach((face,i)=>{
			if(face.key !== key && face.mode === 'active'){
				this.state.faces[i].mode = 'selected';
				
			}
		});

		this.setState(this.state);
	}

	restart(){
		this.state.faces = [];
		for(var i = 0;i < this.count;i++){
			var parameters = [];
			var n = 3;
			for(var z = 0; z < this.parameters; z++){
				parameters.push(random(-this.range,this.range).toFixed(4) * 1);
			}

			this.state.faces.push({
				key: i,
				parameters: parameters,
				img: '',
				mode: ''
			});
		}
		this.update();
	}

	constructor(){
		super(...arguments);
		this.jump = this.jump.bind(this);
	}
	
	jump(data){
		if(data.type === 'start'){
			
			this.state.gender = data.gender;
			this.restart();
		}
	}

	save(){
		var base = this.state.faces[this.state.active].img
		var blob = base64StringToBlob(base, 'image/jpg');
		FileSaver.saveAs(blob, 'face.jpg');
	}

	reset(){
		this.state.active = null;
		this.state.selected = {};
		this.state.faces = this.state.faces.map((face) => {
			face.mode = '';
			return face;
		});

		this.setState(this.state);
	}

	done(){
		this.paras.jump('Results',{
			'type': 'evolve',
			'face': this.state.faces[this.state.active]
		});
	}
	
	render() {
		return ( 
			<React.Fragment>
				<p>
					Select the most attractive faces.
				</p>
				<div id='faces'>
					{ this.state.faces.map(face => <div 
					className={'faces ' + face.mode}
					style={{backgroundImage: 'url(data:image/jpg;base64,' + face.img + ')'}}
					key={face.key}
					onClick={() => this.click(face.key)}>
					</div>)}
				</div>
				<button className='btn btn-danger m-1' onClick={() => this.restart()}>Restart</button>
				<button className='btn btn-warning m-1' onClick={() => this.reset()}>Reset</button>
				<button className='btn btn-primary m-1' onClick={() => this.done()} disabled={this.state.active === null}>Done</button>
				<button className='btn btn-primary m-1' onClick={() => this.back()} disabled={this.state.epoch <= 1}>Back</button>
				<button className='btn btn-success m-1' onClick={() => this.next()} disabled={Object.keys(this.state.selected).length === 0 && this.state.epoch === this.state.history.length}>Next</button>

			</React.Fragment>);
	}
}
 
export default Evolve;
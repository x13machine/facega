import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';

var count = 9;
var parameters = 400;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function Face(){
    var range = 3;
    var faces = [];
    var selected = {};
	var faceImgs = [];

      
    function createFace(){
          var li = []
          var n = 3;
          for(var i =0;i < parameters;i++){
              li.push(random(-range,range).toFixed(4) * 1);
          }
          
          return li;
    }
      
    $('#next').click(() => {
        //breeds the face
        var breed = Object.keys(selected);
        var each = ~~(count / breed.length);
        var remainder = count % breed.length;
        
		
		var change = 0.5;
        
        function breedFace(parent){
			var face = [];
			
			parent.forEach((dp) => {
				face.push(Math.max(Math.min(dp + random(-change, change),0.999),0.001).toFixed(4) * 1);
            });
            
            return face;
        }
        var newFaces = [];
        breed.forEach((id) => {
            for(var i = 0; i< each; i++){
                newFaces.push(breedFace(faces[id]));
            }
        });
        
        for(var i = 0; i < remainder; i++){
            newFaces.push(breedFace(faces[~~random(0,breed.length)]));
        }

        newFaces.sort((a, b) => {return 0.5 - Math.random()});
        faces = newFaces;
		update();
    });

	for(var i = 0;i < count;i++){
		faces.push(createFace());
		
		((i) =>{
			var img = $('<div></div>',{
				'class': 'faces',
				'on':{
					'click' : function(){
                        if($(this).hasClass('selected')){
                            $(this).removeClass('selected');
                            delete selected[i];
                        }else{
                            $(this).addClass('selected');
                            selected[i] = 1;
                        }

                        $('#next').prop('disabled', Object.keys(selected).length === 0);
					}
				}
			});

			faceImgs.push(img);
		
			img.appendTo( '#faces' );
		})(i);
	}
	
	function update(){
		$.ajax('/face', {
			type: 'POST',
			data: JSON.stringify(faces),
            contentType: 'application/json; charset=utf-8',
            headers:{
                'X-CSRFToken': Cookies.get('csrftoken')
            },
			dataType: 'json',
			success: function(imgs){
                selected = {};
                $('.faces').removeClass('selected');
                $('#next').prop('disabled', true);

				imgs.forEach((base,i) => {
					$(faceImgs[i]).css('background-image','url(data:image/jpg;base64,' + base + ')');
				});
			}	
		});
	}
	
    update();
    

}

Face();

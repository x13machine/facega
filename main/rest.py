from django.shortcuts import render
from django.http import *
import numpy as np
from . import autoencoder
from . import models
import json as js
import cv2, base64, utils

bad = HttpResponseBadRequest(js.dumps('nope'), content_type='application/json')


def submitFace(res):

	#validate data
	if not res.is_ajax() or not res.method == 'POST':
		return bad
	try:
		json = js.loads(res.body)
	except:
		return bad
	
	if (
		json == None or 
		type(json) != dict or
		not 'gender' in json or 
		not 'parameters' in json or
		not 'choices' in json or 
		type(json['choices']) != dict
	):
		return bad
	
	gender = 'f' if json['gender'] == 'f' else 'm'
	
	
	pcount = autoencoder.models[autoencoder.default]['bottleneck']
	arr = json['parameters']
	if type(json['parameters']) != list or len(arr) != pcount:
		return bad
	try:
		arr = np.nan_to_num(np.array(arr).astype(np.float64).clip(-20,20))
	except:
		return bad
	choices = json['choices']

	for key, choice in models.choices.items():
		if key == 'g': continue # ignore gender choice
		if not key in choices:
			return bad

		b = True
		choice_ = choices[key]
		for option in choice['options']:
			if option[0] == choice_: 
				b = False
				break
		if b: return bad

	#save data
	uid = utils.uid()
	img = autoencoder.decode(autoencoder.default, gender, arr)
	cv2.imwrite('faces/' + uid + '.jpg',cv2.cvtColor(img, cv2.COLOR_BGR2RGB))

	face = models.Face(
		uid = uid,
		gender = gender,
		parameters = js.dumps(list(arr)),
		poster_gender = choices['pg'],
		poster_sexuality = choices['ps'],
		poster_race  = choices['pr'],
		poster_country = choices['pc']
	)

	face.save()
	
	return HttpResponse(js.dumps('ok'), content_type='application/json')

def sinn(mapping, key, value):
	if value is not None:
		mapping[key] = value

def listFaces(res):
	if not res.is_ajax():
		return bad
	
	tx = {
		'faces': [],
		'rid': 1000000000
	}

	if 'rid' in res.GET and res.GET['rid'].isnumeric():
		tx['rid'] = int(res.GET['rid'])

	options = {
		'id__lt': tx['rid']
	}

	sinn(options, 'gender', res.GET.get('g'))
	sinn(options, 'poster_gender', res.GET.get('pg'))
	sinn(options, 'poster_sexuality', res.GET.get('ps'))
	sinn(options, 'poster_race', res.GET.get('pr'))
	sinn(options, 'poster_country', res.GET.get('pc'))

	for face in models.Face.objects.filter(**options).order_by('-id')[0:100]:
		tx['rid'] = min(tx['rid'], face.id)
		tx['faces'].append({
			'uid': face.uid,
			'g': face.gender,
			'pg': face.poster_gender,
			'ps': face.poster_sexuality,
			'pr': face.poster_race,
			'pc': face.poster_country,
			'pa': face.poster_age
		})

	return HttpResponse(js.dumps(tx), content_type="application/json")
	
def serveFace(res, uid):
	if not utils.isUid(uid):
		return Http404('nope')

	try:
		with open('faces/' + uid + '.jpg', "rb") as f:
			return HttpResponse(f.read(), content_type='image/jpeg')
	except:
		raise Http404('nope')


def generateFace(res):
	if not res.is_ajax() or not res.method == 'POST':
		return bad
	try:
		json = js.loads(res.body)
	except:
		return bad
	
	parameters = autoencoder.models[autoencoder.default]['bottleneck']
	if json == None or type(json) != dict or not 'gender' in json:
		return bad
	
	gender = 'f' if json['gender'] == 'f' else 'm'
	faces = []

	arr_ = json['faces']
	for arr in arr_:
		if type(arr) != list or len(arr) != parameters:
			return bad
		try:
			nums = np.nan_to_num(np.array(arr).astype(np.float64).clip(-20,20))
			faces.append(nums)
		except:
			return bad
	
	tx = []
	for face in faces:
		img = autoencoder.decode(autoencoder.default, gender, face)
		
		_, buf = cv2.imencode('.jpg', cv2.cvtColor(img, cv2.COLOR_RGB2BGR))
		tx.append(base64.b64encode(np.array(buf).tostring()).decode('utf-8'))

	return HttpResponse(js.dumps(tx), content_type="application/json")
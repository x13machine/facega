from django.shortcuts import render
from django.http import *
import numpy as np
from . import autoencoder
import json as js
import cv2, base64, utils
from .models import *

bad = HttpResponseBadRequest(js.dumps('nope'), content_type='application/json')

def sinn(mapping, key, value):
	if value is not None:
		mapping[key] = value


def submitFace(res):
	
	return HttpResponse(js.dumps('ok'), content_type="application/json")

def listFaces(res):
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

	for face in Face.objects.filter(**options).order_by('-id')[0:100]:
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
		face = (img * 255).clip(0,255)
		
		_, buf = cv2.imencode('.jpg', cv2.cvtColor(face, cv2.COLOR_RGB2BGR))
		tx.append(base64.b64encode(np.array(buf).tostring()).decode('utf-8'))

	return HttpResponse(js.dumps(tx), content_type="application/json")
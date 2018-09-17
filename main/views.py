from django.shortcuts import render
from django.http import *

import numpy as np
from .morpher import Morpher
import json as js
import cv2, base64, utils


# Create your views here.

def index(res):
    return render(res, 'index.html',{
        'active_page': 'index'
    })

def about(res):
    return render(res, 'about.html',{
        'active_page': 'about'
    })

def gallery(res):
    return render(res, 'gallery.html',{
        'active_page': 'gallery'
    })

def face(res):
    bad = HttpResponseBadRequest(js.dumps('nope'), content_type="application/json")
    if not res.is_ajax() or not res.method == 'POST':
        return bad
    try:
        json = js.loads(res.body)
    except:
        return bad
    
    parameters = 400

    if json == None or type(json) != list:
        return bad
        
    
    faces = []
    for arr in json:
        if type(arr) != list or len(arr) != parameters:
            return bad
        try:
            nums = np.nan_to_num(np.array(arr).astype(np.float64).clip(0.001,0.999))
            #for num in nums:
            #    num = st.norm.ppf(num)
            faces.append(nums)
        except:
            return bad
    
    
    tx = []
    for face in faces:
        morpher = Morpher()
        morpher.set_Z(face)
        face = (morpher.generate_face() * 255).clip(0,255)
        
        _, buf = cv2.imencode('.jpg', face)
        tx.append(base64.b64encode(np.array(buf).tostring()).decode('utf-8'))

    return HttpResponse(js.dumps(tx), content_type="application/json")
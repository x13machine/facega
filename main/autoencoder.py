from keras.models import load_model
import numpy as np
from scipy.stats import norm
import random

default = '0.0.1'
models = {
	'0.0.1': {
		'bottleneck': 300,
		'size': 64,
		'decoder':{
			'f': 'decoder-f64.h5',
			'm': 'decoder-m64.h5'
		}
	}
}

for version, model in models.items():
	dir_ = 'autoencoders/' + version + '/'
	models[version] = {
		'bottleneck': model['bottleneck'],
		'size': model['size'],
		'decoder':{
			'f': load_model(dir_ + model['decoder']['f']),
			'm': load_model(dir_ + model['decoder']['m'])
		}
	}


def decode(version,gender, li):
	model = models[version]
	decoder = model['decoder'][gender]
	img = decoder.predict(np.array([li]))
	return img.reshape((model['size'],model['size'],3))


def gen():
	li = []
	for _ in range(300):
		li.append(norm.ppf(random.random()))
	return li

#no idea why this is needed, but it is
decode(default,'f',gen())
decode(default,'m',gen())
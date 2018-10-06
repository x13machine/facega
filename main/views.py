from django.shortcuts import render
from django.http import *
from .models import *
import utils
# Create your views here.

def index(res):
	return utils.render(res, 'index', {
		'jsData': {
			'choices': choices
		}
	})

def about(res):
	return utils.render(res, 'about')

def gallery(res):
	return utils.render(res, 'gallery', {
		'jsData': {
			'choices': choices
		}
	})

from django.db import models
import pycountry, secrets
countries = [('ZZ','Unknown')]

for country in pycountry.countries:
	countries.append((country.alpha_2.lower(), country.name))

choices = {
	'g':{
		'name': 'Face Gender',
		'options':[
			('m','Male'),
			('f','Female')
		]
	},
	'pg': {
		'name': 'Poster\'s Gender',
		'question': 'What is your Gender?',
		'default': 'u',
		'options': [
			('m', 'Male'),
			('f', 'Female'),
			('o', 'Other'),
			('u', 'Unknown')
		]
	},
	'ps': {
		'name': 'Poster\'s Sexuality',
		'question': 'What is your sexuality?',
		'default': 'u',
		'options':[
			('s', 'Heterosexual'),
			('g', 'Homosexual'),
			('b', 'Bisexual'),
			('a', 'Asexual'),
			('d', 'Dog Fucker'),
			('o', 'Other'),
			('u', 'Unknown')
		]
	},
	'pr': {
		'name': 'Poster\'s Race',
		'question': 'What is your race?',
		'default': 'u',
		'options': [
			('c', 'Caucasian'),
			('f', 'African'),
			('a', 'Asain'),
			('l', 'Latino'),
			('r', 'Arab'),
			('m', 'Mixed'),
			('o', 'Other'),
			('u', 'Unknown')
		],
	},
	'pc': {
		'name': 'Poster\'s Country',
		'question': 'What your country of origin?',
		'default': 'ZZ',
		'options': countries,
	}
}

for key in choices:
	choices[key]['key'] = key

# Create your models here.
class Face(models.Model):
	uid = models.CharField(max_length=11)
	created = models.DateTimeField(auto_now_add=True)
	parameters = models.TextField(blank=True, default='')
	gender = models.CharField(choices=choices['g']['options'], max_length=1)

	poster_gender = models.CharField(choices=choices['pg']['options'], max_length=1)
	poster_sexuality = models.CharField(choices=choices['ps']['options'], max_length=1)
	poster_race = models.CharField(choices=choices['pr']['options'], max_length=1)
	poster_country = models.CharField(choices=choices['pc']['options'], max_length=2)
	poster_age = models.IntegerField(null=True)


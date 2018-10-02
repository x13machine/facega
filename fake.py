import os, django, random, utils, requests
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'facega.settings')
django.setup()
from main.models import *
from randomuser import RandomUser
from tqdm import tqdm

for user in tqdm(RandomUser.generate_users(1000)):
	uid = utils.uid()
	
	r = requests.get(user.get_picture())
	with open('faces/' + uid + '.jpg', 'wb') as f:
		f.write(r.content)
	
	face = Face(
		uid = uid,
		gender = user.get_gender()[0],
		poster_gender = random.choice(choices['poster_gender'])[0],
		poster_sexuality = random.choice(choices['poster_sexuality'])[0],
		poster_race = random.choice(choices['poster_race'])[0],
		poster_country = random.choice(choices['poster_country'])[0],
		poster_age = random.randint(18,65)
	)

	face.save()
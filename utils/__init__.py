import secrets, re, json
from django import shortcuts
def uid():
	return secrets.token_urlsafe(8)

def isUid(s):
	return re.compile(r"^[a-zA-Z0-9_\-]").match(s)

def render(res,template,vars = {}):
	vars['active_page'] = template
	if 'jsData' in vars: vars['jsData'] = json.dumps(vars['jsData'])
	return shortcuts.render(res, template + '.html',vars)
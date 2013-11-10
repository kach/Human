#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import webapp2
import json
import commands

from google.appengine.ext import db

class Definition(db.Model):
	term = db.StringProperty()
	definition = db.TextProperty()
	ranking = db.IntegerProperty()

class APIHandler(webapp2.RequestHandler):
    def get(self):
    	q = db.Query(Definition)
    	q.filter("term =", self.request.get("term")).order("-ranking")
    	x = []
    	for d in q.run():
    		x.append([d.definition, d.key().id(), d.ranking])
        self.response.write(json.dumps(x))

class GenDef(webapp2.RequestHandler):
	def post(self):
		d = Definition()
		d.term = self.request.get("term")
		if d.term not in commands.COMMANDS:
			self.redirect("/")
		else:
			d.definition = self.request.get("definition")
			d.ranking = 0
			d.put()
			self.redirect("/#"+self.request.get("term"))

class Ranking(webapp2.RequestHandler):
	def get(self):
		d = Definition.get_by_id(int(self.request.get("id")))
		d.ranking = d.ranking + 1
		d.put()
		self.redirect("/#"+self.request.get("term"))
		

app = webapp2.WSGIApplication([
    ('/api', APIHandler),
    ('/gen', GenDef),
    ('/up', Ranking)
], debug=True)

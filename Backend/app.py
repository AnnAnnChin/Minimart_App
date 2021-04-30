import json
from getpass import getpass
from flask import Flask
from flask import jsonify
from flask import request, render_template
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy


# Flask Config
db_server = input("Enter database server: ")
db_username = input("Enter database user: ")
db_password = getpass("Enter database password: ")

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+mysqlconnector://{}:{}@{}/minimart_app".format(db_username, db_password, db_server)

cors = CORS(app)
db = SQLAlchemy(app)


# Model Definition for Item
class Item(db.Model):
	__tablename__ = 'item'
	id = db.Column(db.BigInteger, primary_key=True)
	name = db.Column(db.String(50))
	price = db.Column(db.Numeric(3,2))


@app.route("/api/item/query-all", methods=['GET'])
def query_all():
	# Retrieve all the items from the database
	items = Item.query.all()
	return jsonify([{"id": item.id, "name": item.name, "price": float(item.price)} for item in items])
	#return jsonify({"Items": [{"id": item.id, "name": item.name, "price": float(item.price)} for item in items]})


@app.route("/api/item/create", methods=['POST'])
def create():
	params = request.json

	# Check if all parameters are provided
	if not params.get("id") or not params.get("name") or not params.get("price"):
		return {"success": False, "Message": "Missing parameters"}
		
	# Check if all parameters are of correct type
	if not isinstance(params.get("id"), int) or not isinstance(params.get("price"), float):
		return {"success": False, "Message": "Invalid parameters"}
		
	# Check if the name exceeds the length limit
	if (len(params.get("name")) > 50):
		return {"success": False, "Message": "Name is too long"}
		
	# Retrieve the item with the corresponding id
	item = Item.query.filter_by(id=params.get("id")).first()
	
	# Check if the item with the corresponding id does not exist
	if not item:
		# Create the item with the id, name, price, and insert it into database
		item = Item(id=params.get("id"), name=params.get("name"), price=params.get("price"))
		db.session.add(item)
		db.session.commit()
		return {"success": True}
		
	else:
		return {"success": False, "Message": "Item with this id already exist"}


@app.route("/api/item/update", methods=['POST'])
def update():
	params = request.json
	
	# Check if all parameters are provided
	if not params.get("id") or not params.get("name") or not params.get("price"):
		return {"success": False, "Message": "Missing parameters"}
		
	# Check if all parameters are of correct type
	if not isinstance(params.get("id"), int) or not isinstance(params.get("price"), float):
		return {"success": False, "Message": "Invalid parameters"}
		
	# Check if the name exceeds the length limit
	if (len(params.get("name")) > 50):
		return {"success": False, "Message": "Name is too long"}
		
	# Retrieve the item with the corresponding id
	item = Item.query.filter_by(id=params.get("id")).first()
	
	# Check if the item with the corresponding id exist
	if item:
		# Update its name and price into database
		item.name = params.get("name")
		item.price = params.get("price")
		db.session.commit()
		return {"success": True}
		
	else:
		return {"success": False, "Message": "Item with this id does not exist"}


@app.route("/api/item/delete", methods=['POST'])
def delete():
	params = request.json
	
	# Check if all parameters are provided
	if not params.get("id"):
		return {"success": False, "Message": "Missing parameters"}
		
	# Check if all parameters are of correct type
	if not isinstance(params.get("id"), int):
		return {"success": False, "Message": "Invalid parameters"}
		
	# Retrieve the item with the corresponding id
	item = Item.query.filter_by(id=params.get("id")).first()
	
	# Check if the item with the corresponding id exist
	if item:
		# Delete the record from database
		db.session.delete(item)
		db.session.commit()
		return {"success": True}
		
	else:
		return {"success": False, "Message": "Item with this id does not exist"}


if __name__ == "__main__":
	app.run(host='0.0.0.0', debug=True)
	
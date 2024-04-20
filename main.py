from flask import Flask,request,jsonify,session
import os
from dbConfig import DBConnection
import random
import string
import hashlib
import jwt
from flask_cors import CORS
app=Flask(__name__)
app.secret_key="password_manager_application"
CORS(app)

def generate_hash_password(password):
    salt = "".join(random.choices(string.hexdigits, k=32))
    salted_password = (password+salt).encode("utf-8")
    hash_object = hashlib.sha256(salted_password)
    hashed_password = hash_object.hexdigest()
    return hashed_password,salt

def compare_password(password,saved_hashed_password,salt):
    salted_password = (password + salt).encode("utf-8")
    hash_object = hashlib.sha256(salted_password)
    hashed_password = hash_object.hexdigest()
    return hashed_password == saved_hashed_password
   
def generateToken(payload):
    secret_key = os.environ.get("SECRET_KEY") or "secret_key_password_manager"
    encoded_jwt = jwt.encode(payload, secret_key, algorithm='HS256')
    return encoded_jwt 


def create_master_login_data():
    db,dbCon = DBConnection()
    hash,salt=generate_hash_password("master")
    db.execute('''
            INSERT INTO USERS(username, password, isMaster, salt)
            VALUES (?, ?, ?, ?)
        ''', ("masterlogin@gmail.com", hash, True, salt))
    dbCon.commit()

def createUsersTable():
    db,dbCon = DBConnection()
    db.execute('''
               CREATE TABLE IF NOT EXISTS USERS (
                   username varchar(255),
                   password varchar(255),
                   isMaster boolean,
                   salt varchar(255)
               )
               ''')
    dbCon.commit()

def createPasswordManagerTable():
    db,dbCon = DBConnection()
    db.execute('''
               CREATE TABLE IF NOT EXISTS PASSWORD_MANAGER (
                   username varchar(255),
                   password varchar(255),
                   salt varchar(255)
               )
               ''')
    dbCon.commit()
    

@app.route("/test")
def test():
    return "Hello World"

@app.route("/login",methods=["POST"])
def login():
    if request.method == 'POST':
        body = request.json
        print(body)
        if body == None:
            return jsonify({"message":"Inviald operation please give details properly","status":404})
        
        username= body["username"]
        password= body["password"]
        print(username)
        db,dbCon= DBConnection()
        cursor = db.execute('''
    SELECT * FROM USERS WHERE username = ?
    ''', (username,))
        user=cursor.fetchone()
        print(user)
        if user is None:
            return jsonify({"message":"User not found. Please try to create one","status":404})
        
        
        hash,salt= generate_hash_password(body["password"])
        
        isCorrectPassword=compare_password(body["password"],hash,salt)
        
        if not isCorrectPassword:
            return jsonify({"message":"Invalid password","status":404})
        
        token=generateToken(body)
        
        session["token"]=token
        
        session["user"]=user
        
        dbCon.commit()
        
        userData={"username":user[0],"isMaster":user[2]}

        return jsonify({"user":userData,"token":token})
        
    return

@app.route("/register",methods=["POST"])
def register():
    if request.method=="POST":
        body=request.json
        print(body)
        if body==None:
            return jsonify({"message":"Inviald operation please give details properly","status":404})
        
        username=body["username"]
        password=body["password"]
        print(username)
        db,dbCon= DBConnection()
        coursor = db.execute('''
            SELECT username, password FROM USERS WHERE username = ?
        ''', (username,))
        user=coursor.fetchone()
        print(user)
        if user is not None:
            return jsonify({"message":"User already exists","status":404})
        
        hash,salt= generate_hash_password(password)
        
        db.execute('''
            INSERT INTO USERS(username, password, isMaster, salt)
            VALUES (?, ?, ?, ?)
        ''', (username, hash, False, salt))
        
        dbCon.commit()
        
        return jsonify({"message":"User created successfully","status":200})
        

if __name__=='__main__':
    port = os.getenv("PORT")
    createUsersTable()
    createPasswordManagerTable()
    create_master_login_data()
    app.run(port,debug=True)
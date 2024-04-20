import sqlite3

def DBConnection():
    dbcon = sqlite3.connect('sivaDB.db')
    print("Databse connected successfully")
    return dbcon.cursor(),dbcon
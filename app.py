from flask import Flask, render_template, url_for, redirect
import json

app = Flask(__name__) #create instance of class Flask

#get JSON data...
all_data = []
systems = ["ds","3ds","wii","wii_u","switch"]

for system in systems:
    f = open("./data/"+system+".json","r")
    info = f.read()
    data = json.loads(info)
    all_data += data["games"]["game"]

@app.route("/") #assign fxn to route
def index():
    return render_template('index.html', bar_data = all_data)

if __name__ == "__main__":
    app.debug = True
    app.run()

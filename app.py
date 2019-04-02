from flask import Flask, render_template, request, url_for, redirect
import urllib.request, json, os

app = Flask(__name__) #create instance of class Flask

#get JSON data...

all_data = []
systems = ["ds","3ds","wii","wii_u","switch"]
stub = "https://www.nintendo.com/json/content/get/filter/game?limit=200&system="

for system in systems:
    req = urllib.request.Request(stub+system, headers={'User-Agent': 'Mozilla/5.0'})
    object = urllib.request.urlopen(req)
    info = object.read()
    data = json.loads(info)
    all_data += data["games"]["game"]

sorted_data = []
for i in range(90):
    sorted_data.append([])

month_dict = {
"Jan": 0, "Feb": 0, "Mar": 1, "Apr": 1, "May": 2, "Jun": 2, "Jul": 3, "Aug": 3, "Sep": 4, "Oct": 4, "Nov": 5, "Dec": 5
}

for game in all_data:
    # date_arr looks like ["month","day","year"]
    date_arr = game["release_date"].split()
    new_index = month_dict[date_arr[0]] + 6*(int(date_arr[2]) - 2006)
    sorted_data[new_index].append(game)

@app.route("/") #assign fxn to route
def index():
    sorted_data=[]
    for i in range(90):
        sorted_data.append([])
    for game in all_data:
    # date_arr looks like ["month","day","year"]
        date_arr = game["release_date"].split()
        new_index = month_dict[date_arr[0]] + 6*(int(date_arr[2]) - 2006)
        sorted_data[new_index].append(game)
    return render_template('index.html', bar_data = sorted_data)

@app.route("/filtyear", methods=["POST"])
def fyears():
    sorted_data=[]
    for i in range(90):
        sorted_data.append([])
    date=request.form["year"]
    if int(date)>=2006 and int(date)<=2020:
        for game in all_data:
            # date_arr looks like ["month","day","year"]
            date_arr = game["release_date"].split()
            if date_arr[2]==date:
                   new_index = month_dict[date_arr[0]] + 6*(int(date_arr[2]) - 2006)
                   sorted_data[new_index].append(game)
        return render_template('index.html', bar_data = sorted_data)
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.debug = True
    app.run()

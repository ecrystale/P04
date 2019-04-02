from flask import Flask, render_template
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

    # inner_info = {}
    # inner_info["levels"] = grow_data["levels"]
    # for pokemon in grow_data["pokemon_species"]:
    #     growth_dict[grow_data["name"]] = inner_info
    #
#clean it up...

#final version (temporary data)
# all_data = [
# {
# "categories": {
# "category": [
# "Adventure",
# "Action",
# "RPG"
# ]
# },
# "slug": "the-legend-of-zelda-breath-of-the-wild-wii-u",
# "buyitnow": "true",
# "release_date": "Mar 3, 2017",
# "digitaldownload": "false",
# "free_to_start": "false",
# "title": "The Legend of Zelda: Breath of the Wild",
# "system": "Wii U",
# "id": "Re1dtCs7lsIRvAjCn7IPP6WmaTHMsP8Q",
# "ca_price": "79.99",
# "number_of_players": "1 player",
# "nsuid": "20010000026167",
# "video_link": "FzMW0zNDE6qCf5cwSi1ks9AD5tx4fyRI",
# "eshop_price": "59.99",
# "front_box_art": "https://media.nintendo.com/nintendo/bin/G_AItCf7hdJlG0YL0yTI8c6lqm7PY4WF/OjVzyih2tqF2gRQ7w-jp_80vtyGGG0m6.png",
# "game_code": "WUPNALZE",
# "buyonline": "true"
# },
# {
# "categories": {
# "category": [
# "Action",
# "Adventure"
# ]
# },
# "slug": "paper-mario-color-splash-wii-u",
# "buyitnow": "true",
# "release_date": "Apr 7, 2011",
# "digitaldownload": "false",
# "free_to_start": "false",
# "title": "Paper Mario: Color Splash",
# "system": "Wii U",
# "id": "WL8M7j06y2lwqnfmYVIA7Z0lYZmqBd2E",
# "number_of_players": "1 player",
# "nsuid": "20010000024427",
# "video_link": "hwaHJ5NTE64BzuFNYG5boXVwJPLqZr5b",
# "eshop_price": "59.99",
# "front_box_art": "https://media.nintendo.com/nintendo/bin/3YLTraky5KfX8AN0UogUTkn3f9k-w_dW/z3PrhnnzBy1xHDI_ohHcWSTCcq2OApdC.png",
# "game_code": "WUPNCNFE",
# "buyonline": "true"
# },
# {
# "categories": {
# "category": "Sports"
# },
# "slug": "mario-and-sonic-at-the-rio-2016-olympic-games-wii-u",
# "buyitnow": "true",
# "release_date": "Sep 24, 2020",
# "digitaldownload": "false",
# "free_to_start": "false",
# "title": "Mario & Sonic at the Rio 2016 Olympic Games",
# "system": "Wii U",
# "id": "sNrMCHZIEsXUZMrheeiYaxTbHeHlE8-X",
# "ca_price": "74.99",
# "number_of_players": "up to 4 players",
# "nsuid": "20010000022048",
# "video_link": "ByeWltdTqrA2gxxusc5nqIuf_pqGhYea",
# "eshop_price": "59.99",
# "front_box_art": "https://media.nintendo.com/nintendo/bin/FTo9XLsqlt65dvO3rUu3J0-L5kck5pHn/z_xWgIndfbvBDDFNlSZh_2yrBElW2pcS.png",
# "game_code": "WUPNABJE",
# "buyonline": "true"
# },
# {
# "categories": {
# "category": [
# "Role-Playing",
# "Adventure"
# ]
# },
# "slug": "tokyo-mirage-sessions-fe-wii-u",
# "buyitnow": "true",
# "release_date": "Jun 24, 2016",
# "digitaldownload": "false",
# "free_to_start": "false",
# "title": "Tokyo Mirage Sessions &#9839;FE",
# "system": "Wii U",
# "id": "_c9wXm4oFjRAFGU6iYXJFyR2Bb4E5lEM",
# "ca_price": "74.99",
# "number_of_players": "1 player",
# "nsuid": "20010000022047",
# "video_link": "d2bDlkNDE6n5JL5w0P3TfjMzE1DhFMcT",
# "eshop_price": "59.99",
# "front_box_art": "https://media.nintendo.com/nintendo/bin/d1ZBh1YjQoXqs1Vgbqd4HAUlEaTveA0n/UCKkknVf1GzJZKjuiHqG9SWcvqdznRLj.png",
# "game_code": "WUPNASEE",
# "buyonline": "true"
# },
# {
# "categories": {
# "category": [
# "Puzzles",
# "Strategy"
# ]
# },
# "buyitnow": "false",
# "release_date": "Jul 16, 2015",
# "digitaldownload": "true",
# "free_to_start": "false",
# "title": "G.G Series VECTOR",
# "system": "Nintendo DS",
# "id": "oN8WZ_DFGEK2g6_tiomkW_c8GXq8mNYK",
# "number_of_players": "1 player",
# "nsuid": "50010000034755",
# "eshop_price": "1.99",
# "front_box_art": "https://media.nintendo.com/nintendo/bin/JMLGKaamgcsIXpdhNWWcTUbsLxUje_nq/cU9sWelMMedXm612qXi-wjw5v2X9gOJz.png",
# "game_code": "TWLNK5OE",
# "buyonline": "true"
# },
# {
# "categories": {
# "category": "Sports"
# },
# "buyitnow": "false",
# "release_date": "Jun 25, 2015",
# "digitaldownload": "true",
# "free_to_start": "false",
# "title": "G.G Series AIR PINBALL HOCKEY",
# "system": "Nintendo DS",
# "id": "EHgVuga6R1eurz5ZFSbq7RM2X1LP032b",
# "number_of_players": "1 player",
# "nsuid": "50010000034735",
# "eshop_price": "1.99",
# "front_box_art": "https://media.nintendo.com/nintendo/bin/yvJEaQx5TmJPeTnEhZRzFfYaZHni_l6X/5nXX2wZFvQRiOe0QrSaxnera_Q4hocnc.png",
# "game_code": "TWLNK25E",
# "buyonline": "true"
# },
# {
# "categories": {
# "category": [
# "Action",
# "Adventure"
# ]
# },
# "buyitnow": "false",
# "release_date": "Jun 25, 2015",
# "digitaldownload": "true",
# "free_to_start": "false",
# "title": "G.G Series DRILLING ATTACK!!",
# "system": "Nintendo DS",
# "id": "wQOLuuW9pmQUHlt9Gm1ZAop4Ah6W50yU",
# "number_of_players": "1 player",
# "nsuid": "50010000034816",
# "eshop_price": "1.99",
# "front_box_art": "https://media.nintendo.com/nintendo/bin/m01Y4Vxa67N4MLM7Tt5LlVYsSFdySO5D/R4rYGwzFSr8GOw5qMjMOwnEuonX-Exx7.png",
# "game_code": "TWLNKDAE",
# "buyonline": "true"
# },
# {
# "categories": {
# "category": [
# "Puzzles",
# "Strategy"
# ]
# },
# "buyitnow": "false",
# "release_date": "Jun 25, 2015",
# "digitaldownload": "true",
# "free_to_start": "false",
# "title": "G.G Series ENERGY CHAIN",
# "system": "Nintendo DS",
# "id": "257gx17imrIeWu5KFFAFLq78ykfs0sw1",
# "number_of_players": "1 player",
# "nsuid": "50010000034695",
# "eshop_price": "1.99",
# "front_box_art": "https://media.nintendo.com/nintendo/bin/0rkXlG9e5pBn-uBIzWni_5rxguJWeOxQ/ewwJEtLutjg5Iv2ZTsKIIpoSsOsJNClO.png",
# "game_code": "TWLNKD7E",
# "buyonline": "true"
# },
# {
# "categories": {
# "category": [
# "RPG",
# "Adventure"
# ]
# },
# "slug": "pokemon-ultra-moon-starter-pack-3ds",
# "buyitnow": "true",
# "release_date": "Nov 17, 2017",
# "digitaldownload": "false",
# "free_to_start": "false",
# "title": "PokÃ©mon Ultra Moon Starter Pack",
# "system": "Nintendo 3DS",
# "id": "vp3w3YaMjqvDCcdXqHgk0mOV-72GHqU7",
# "ca_price": "49.99",
# "number_of_players": "up to 4 players",
# "video_link": "xud3RoZDE6AXXa5_SfFR2mdykE6IUbjq",
# "eshop_price": "39.99",
# "front_box_art": "https://media.nintendo.com/nintendo/bin/ZIu3FgGNnY9droSIB0qxoRdbuoBowTAg/05VM3eT5h_dmrO3cbNUwOJ447yLBEOHB.jpg",
# "game_code": "CTRRA2B1",
# "buyonline": "false"
# },
# {
# "categories": {
# "category": [
# "RPG",
# "Adventure"
# ]
# },
# "slug": "pokemon-ultra-sun-3ds",
# "buyitnow": "true",
# "release_date": "Nov 17, 2017",
# "digitaldownload": "false",
# "free_to_start": "false",
# "nso": "false",
# "title": "PokÃ©mon Ultra Sun",
# "system": "Nintendo 3DS",
# "id": "3U32YbT2e0o2DbVk8YWwn8QHgz0Val6t",
# "ca_price": "49.99",
# "number_of_players": "up to 4 players",
# "nsuid": "50010000043877",
# "video_link": "xud3RoZDE6AXXa5_SfFR2mdykE6IUbjq",
# "eshop_price": "39.99",
# "front_box_art": "https://media.nintendo.com/nintendo/bin/h_OQ2QtP8WRsQ-__ubK5nWZZ6hT3vhSR/1y0ewuZr4G164lM44F9Nugmm3ZkiuicF.png",
# "game_code": "CTRNA2AA",
# "buyonline": "true"
# },
# {
# "categories": {
# "category": [
# "RPG",
# "Adventure"
# ]
# },
# "slug": "pokemon-ultra-sun-and-pokemon-ultra-moon-veteran-trainers-dual-pack-3ds",
# "buyitnow": "true",
# "release_date": "Nov 17, 2017",
# "digitaldownload": "false",
# "free_to_start": "false",
# "title": "PokÃ©mon Ultra Sun & PokÃ©mon Ultra Moon Veteran Trainer's Dual Pack",
# "system": "Nintendo 3DS",
# "id": "Jv2vwIEpoBvXZghKlQPngLFoHjCFZQkk",
# "ca_price": "99.99",
# "number_of_players": "up to 4 players",
# "video_link": "xud3RoZDE6AXXa5_SfFR2mdykE6IUbjq",
# "eshop_price": "79.99",
# "front_box_art": "https://media.nintendo.com/nintendo/bin/mwj6wFqakbXZtv33ClExmT4voDaYxdAe/ecP3ZlWGM2GorlPQODIGk6rT416jgPsd.png",
# "game_code": "CTRRGA21",
# "buyonline": "false"
# },
# {
# "categories": {
# "category": [
# "RPG",
# "Adventure"
# ]
# },
# "slug": "pokemon-ultra-sun-and-ultra-moon-steelbook-dual-pack-3ds",
# "buyitnow": "true",
# "release_date": "Nov 17, 2017",
# "digitaldownload": "false",
# "free_to_start": "false",
# "title": "PokÃ©mon Ultra Sun and Ultra Moon Steelbook Dual Pack",
# "system": "Nintendo 3DS",
# "id": "kfUuAyfL4N_tOFpY3wLgAHZHvbWhS3rU",
# "ca_price": "99.99",
# "number_of_players": "up to 4 players",
# "video_link": "xud3RoZDE6AXXa5_SfFR2mdykE6IUbjq",
# "eshop_price": "79.99",
# "front_box_art": "https://media.nintendo.com/nintendo/bin/r2_QEe8cWCKwH3s6eC7I5uSt05NiInxs/B7eOaKz009tFYgxFI1WkGmaECzX99OvL.png",
# "game_code": "CTRRSA21",
# "buyonline": "false"
# },
# {
# "categories": {
# "category": [
# "Action",
# "Fighting",
# "Multiplayer"
# ]
# },
# "slug": "super-smash-bros-switch",
# "buyitnow": "true",
# "release_date": "Dec 7, 2018",
# "digitaldownload": "false",
# "free_to_start": "false",
# "nso": "true",
# "title": "Super Smash Bros. Ultimate",
# "system": "Nintendo Switch",
# "id": "XYfGbmHybciAx7wE3EiKIu8c32ip0ULk",
# "ca_price": "79.99",
# "number_of_players": "up to 8 players",
# "nsuid": "70010000012332",
# "video_link": "RqOXN1ZzE6xQzyiDXU2ChMrmEAACGHLT",
# "eshop_price": "59.99",
# "front_box_art": "https://media.nintendo.com/nintendo/bin/NhJKOajUMaYvsmA3U_t7yopYGn9Ngg68/ACWc5mU2Dv3LhQyySJv-X32ptL7MrQar.png",
# "game_code": "HACNAAABA",
# "buyonline": "true"
# },
# {
# "categories": {
# "category": [
# "Action",
# "Fighting",
# "Multiplayer"
# ]
# },
# "slug": "super-smash-bros-ultimate-special-edition-switch",
# "buyitnow": "true",
# "release_date": "Dec 7, 2018",
# "digitaldownload": "false",
# "nso": "true",
# "free_to_start": "false",
# "title": "Super Smash Bros. Ultimate Special Edition",
# "system": "Nintendo Switch",
# "id": "Tu6zfQ9JsGj1YN_6okuKVTBwbe2VSj4J",
# "ca_price": "179.99",
# "number_of_players": "up to 8 players",
# "video_link": "RqOXN1ZzE6xQzyiDXU2ChMrmEAACGHLT",
# "eshop_price": "139.99",
# "front_box_art": "https://media.nintendo.com/nintendo/bin/m62L4w67ZmeVBQ5tJy9bkZllF46s8qrS/biP0ebud0TMSqptYRE-lD9AcCP_tuXUa.png",
# "game_code": "HACRAAAB1",
# "buyonline": "true"
# },
# {
# "categories": {
# "category": [
# "Adventure",
# "Role-Playing",
# "Multiplayer"
# ]
# },
# "slug": "pokemon-lets-go-eevee-switch",
# "buyitnow": "true",
# "release_date": "Nov 16, 2018",
# "digitaldownload": "false",
# "free_to_start": "false",
# "nso": "true",
# "title": "PokÃ©mon: Let's Go, Eevee!",
# "system": "Nintendo Switch",
# "id": "KefRP5_7CRw9kp8hNS57ApyKEXrjKgFn",
# "ca_price": "79.99",
# "number_of_players": "2 players simultaneous",
# "nsuid": "70010000000450",
# "video_link": "hldWRwZzE6-qvFZi_mi6Xt69lA4uUYFT",
# "eshop_price": "59.99",
# "front_box_art": "https://media.nintendo.com/nintendo/bin/CSOAMj2W9rveoiuTcGo-hzGAIeGTo5Kw/v2mTDaF2iZdcQxjIyLke0fKQGEqwj7l7.png",
# "game_code": "HACNADW3A",
# "buyonline": "true"
# },
# {
# "categories": {
# "category": [
# "Adventure",
# "Role-Playing",
# "Multiplayer"
# ]
# },
# "slug": "pokemon-lets-go-pikachu-switch",
# "buyitnow": "true",
# "release_date": "Nov 16, 2018",
# "digitaldownload": "false",
# "free_to_start": "false",
# "nso": "true",
# "title": "PokÃ©mon: Let's Go, Pikachu!",
# "system": "Nintendo Switch",
# "id": "i2MD5wC29vqM4uPYh6Tw-oKYojmuvsWg",
# "ca_price": "79.99",
# "number_of_players": "2 players simultaneous",
# "nsuid": "70010000000447",
# "video_link": "hldWRwZzE6-qvFZi_mi6Xt69lA4uUYFT",
# "eshop_price": "59.99",
# "front_box_art": "https://media.nintendo.com/nintendo/bin/vt7les7qOfqmuiYlgQqE1KvoBGcDYwfW/IEqiKeiJ-27z1heGl5Wc34Nmhp_T_3aW.png",
# "game_code": "HACNADW2A",
# "buyonline": "true"
# },
# {
# "number_of_players": "1 player",
# "categories": {
# "category": "Arcade"
# },
# "buyitnow": "false",
# "video_link": "c3ZnFuajoSF7i0pADv5NirLh2zQx5QTE",
# "release_date": "Jan 26, 2012",
# "front_box_art": "https://media.nintendo.com/nintendo/bin/4zz-UvlMRia0b0iMo8VRWZPsNkAvx_-u/07S4hW2KDZsLI1biZ87_1B2jEGvcvJ_1.jpg",
# "digitaldownload": "true",
# "game_code": "RVLNWNSE",
# "system": "Wii",
# "title": "Newton Vs The Horde",
# "id": "vIc-myJq6PyZniBoHTvA39RkTvl_BEl4"
# },
# {
# "number_of_players": "1 player",
# "categories": {
# "category": "Role-Playing"
# },
# "buyitnow": "false",
# "video_link": "54ang2NTqzJikxNTkmMcnkohD0wkq0It",
# "release_date": "Jan 19, 2012",
# "front_box_art": "https://media.nintendo.com/nintendo/bin/afMIRY1mDTdaPUGJF9xV3faZXGE6Vtq7/s98n7KcgbYrj4UVw-WgUVWK2o4igh-tg.jpg",
# "digitaldownload": "true",
# "game_code": "RVLNWSHE",
# "system": "Wii",
# "title": "Stonekeep: Bones of the Ancestors",
# "id": "9u5rYApQG7LfOeFJJK8OtTZNIZlX86Nq"
# },
# {
# "number_of_players": "1 player",
# "categories": {
# "category": "Edutainment"
# },
# "buyitnow": "false",
# "release_date": "Jan 12, 2011",
# "front_box_art": "https://media.nintendo.com/nintendo/bin/AS78mFr0CjsTjLX0vfFQ6Y9K2BvhNZkr/v1hhqHHX0fcbcb5vpYtyGn8c3iep9JJE.jpg",
# "digitaldownload": "true",
# "game_code": "RVLNWAKE",
# "system": "Wii",
# "title": "Carmen Sandiego Adventures in Math: The Case of the Crumbling Cathedral",
# "id": "PEiyBVfEafqMdyIG-60d6VcH5HOUSy76"
# },
# {
# "number_of_players": "1 player",
# "categories": {
# "category": [
# "Action",
# "Adventure"
# ]
# },
# "buyitnow": "false",
# "video_link": "EwaXFuajpqdV8elG8v9it-pyPqNZE10s",
# "release_date": "Dec 5, 2020",
# "front_box_art": "https://media.nintendo.com/nintendo/bin/QVEKt5EdJPA6GboIVUTaVp6FZtgbaIGc/5b7oNqCnD8d7n5_yCqkitGCm9tx7y_67.jpg",
# "digitaldownload": "true",
# "game_code": "RVLNWZAE",
# "system": "Wii",
# "title": "Zombii Attack",
# "id": "wSmaRwcJFGcWeZsOUiXS3FEJaWels6ho"
# },
# {
# "number_of_players": "up to 6 players",
# "categories": {
# "category": "Edutainment"
# },
# "buyitnow": "false",
# "video_link": "05OHc2NTqPAz8pAzarYA3Gf34OUai0r7",
# "release_date": "Jun 29, 2015",
# "front_box_art": "https://media.nintendo.com/nintendo/bin/QIiOA4IOs-JSPGbkVElY7s50m4-S7FO4/5VexYLkRVbh9KkQfNRWQakClKDeRMbwC.jpg",
# "digitaldownload": "true",
# "game_code": "RVLW3AE",
# "system": "Wii",
# "title": "Carmen Sandiego Adventures in Math: The Big Ben Burglary",
# "id": "HrutaFC934_8wjziYsH5fby3vubc6eXK"
# },
# {
# "number_of_players": "1 player",
# "categories": {
# "category": "Edutainment"
# },
# "buyitnow": "false",
# "release_date": "Jan 12, 2013",
# "front_box_art": "https://media.nintendo.com/nintendo/bin/AS78mFr0CjsTjLX0vfFQ6Y9K2BvhNZkr/v1hhqHHX0fcbcb5vpYtyGn8c3iep9JJE.jpg",
# "digitaldownload": "true",
# "game_code": "RVLNWAKE",
# "system": "Wii",
# "title": "Carmen Sandiego Adventures in Math: The Case of the Crumbling Cathedral",
# "id": "PEiyBVfEafqMdyIG-60d6VcH5HOUSy76"
# },
# {
# "number_of_players": "1 player",
# "categories": {
# "category": [
# "Action",
# "Adventure"
# ]
# },
# "buyitnow": "false",
# "video_link": "EwaXFuajpqdV8elG8v9it-pyPqNZE10s",
# "release_date": "Dec 5, 2015",
# "front_box_art": "https://media.nintendo.com/nintendo/bin/QVEKt5EdJPA6GboIVUTaVp6FZtgbaIGc/5b7oNqCnD8d7n5_yCqkitGCm9tx7y_67.jpg",
# "digitaldownload": "true",
# "game_code": "RVLNWZAE",
# "system": "Wii",
# "title": "Zombii Attack",
# "id": "wSmaRwcJFGcWeZsOUiXS3FEJaWels6ho"
# },
# {
# "number_of_players": "up to 6 players",
# "categories": {
# "category": "Edutainment"
# },
# "buyitnow": "false",
# "video_link": "05OHc2NTqPAz8pAzarYA3Gf34OUai0r7",
# "release_date": "Nov 29, 2011",
# "front_box_art": "https://media.nintendo.com/nintendo/bin/QIiOA4IOs-JSPGbkVElY7s50m4-S7FO4/5VexYLkRVbh9KkQfNRWQakClKDeRMbwC.jpg",
# "digitaldownload": "true",
# "game_code": "RVLW3AE",
# "system": "Wii",
# "title": "Carmen Sandiego Adventures in Math: The Big Ben Burglary",
# "id": "HrutaFC934_8wjziYsH5fby3vubc6eXK"
# }
# ]

sorted_data = []
for i in range(72):
    sorted_data.append([])

month_dict = {
"Jan": 0, "Feb": 0, "Mar": 1, "Apr": 1, "May": 2, "Jun": 2, "Jul": 3, "Aug": 3, "Sep": 4, "Oct": 4, "Nov": 5, "Dec": 5
}

for game in all_data:
    # date_arr looks like ["month","day","year"]
    date_arr = game["release_date"].split()
    new_index = month_dict[date_arr[0]] + 6*(int(date_arr[2]) - 2009)
    sorted_data[new_index].append(game)

@app.route("/") #assign fxn to route
def index():
    return render_template('index.html', bar_data = sorted_data)

if __name__ == "__main__":
    app.debug = True
    app.run()

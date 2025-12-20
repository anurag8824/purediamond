from pymongo import MongoClient
import certifi
# dbClient = MongoClient('mongodb://159.223.245.11:27036/metablock?directConnection=true&serverSelectionTimeoutMS=2000&replicaSet=rs0')

# dbClient = MongoClient('mongodb+srv://infayou:JM.dHK_PpCnV7%40L@cluster0.zbf0n.mongodb.net/infa?retryWrites=true&w=majority&appName=Cluster0&tlsAllowInvalidCertificates=true')
# dbClient = MongoClient("mongodb+srv://365infayou:Jv9lwv6csl7J1Jp5@cluster365.sxln4q8.mongodb.net/infa?retryWrites=true&w=majority&appName=Cluster365&tlsAllowInvalidCertificates=true")
dbClient = MongoClient("mongodb://admin:betbhaiAdmin123@72.61.18.12:27017/infa?replicaSet=rs0&authSource=admin")

print(dbClient)
db = dbClient.get_database()
print(db)
Balances = db['balances']  # collection object
Market = db['markets']
Bet = db['bets']
Match = db['matches']
User = db['users']
BetLock = db['betlocks']
CasinoMatch = db['casinomatches']
Lenah = db['lenahs']
Denah = db['denahs']

#data = CasinoMatch.find_one({"match_id":12})
#print(data)

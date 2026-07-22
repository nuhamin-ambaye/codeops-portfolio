#collections
#lists

cities=["Addis Ababa", "Adama", "Hawassa", "Bahir Dar"]
cities[0]="Adama"
cities.append("Debrebirhan")
cities.insert(3, "Wolkite")
cities.remove("Adama")
#print(cities)
for city in cities:
    print (cities)

#dictionary
customer1={     #instance
    "name":"Abebe",
    "balance": 1500,
    "city": "Addis Ababa",
}
customer1['city']="Adama"   #print lemaregim yihe new syntaxu
print(customer1)
#print(customer.get("phone_no"))
print(customer.keys)    #keywochun lemagignet

#set
coll1=[1,2,3]
coll2=[3,4,5]
print(cities)
city_set=set(cities)    
city_set=set()

print(city_set)

#import math
#from math import pow     
#executionachin lay load endaynor yadergal minfelgewin bicha metratachin
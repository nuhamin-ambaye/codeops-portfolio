stock = {}
try:
    with open("stock.txt") as f:
        for line in f:
            item, quantity = line.strip().split(",")
            stock[item] = int(quantity)
except FileNotFoundError:
    print("No stock file!")

def adjust(item, amount):
    stock[item] = stock.get(item, 0) + amount

adjust("Paracetamol", 20)
adjust("Amoxicillin", 6)
adjust("ORS", 35)

low = [item for item, quantity in stock.items() if quantity < 10]
print("Low stock:", low) 

with open("stock.txt", "w") as f:
    for item, quantity in stock.items():
        f.write(f"{item},{quantity}\n")
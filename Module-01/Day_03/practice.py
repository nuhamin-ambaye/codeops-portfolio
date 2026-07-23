#1. Unique cities

cities=["Addis ababa", "Hawassa", "Addis ababa", "Mekele", "Harar", "Mekele"]
unique_cities=set(cities)
for city in unique_cities:
    print(city)
print(f"Total uniques cities count: {len(unique_cities)}")

#2. Price report

groceries={
    "Potato": 50,
    "Onion": 100,
    "Rice": 80,
    "Carrot": 40,
    "Cabbage":70
}
for item, price in groceries.items():
    print(f"{item}: {price}ETB")

#3. Tax comprehension

prices=[100, 250, 400, 80]
taxed_price=[round(price*1.15, 2) for price in prices]
print(taxed_price)

#4 Cheap items

prices=[100, 250, 400, 80]
cheap_prices=[]
for price in prices:
    if price<200:
        cheap_prices.append(price)
print(cheap_prices)

#5. Write and read

names=["Nuhamin", "Eden", "Nardos"]
with open("names.txt", "w") as f:
    for name in names:
        f.write(name+"\n")
with open("names.txt", "r") as f:
    for line in f:
        print(line.strip())

#6. Safe division

try:
    divisor=input("Enter a number to divide 1000: ")
    number=float(divisor)
    quotient=1000/number
    print(f"Quotient={quotient}")
except ValueError:
    print("ERROR! \nPlease enter valid numeric value.")
except ZeroDivisionError:
    print("ERROR! \nYou can't divide by zero.")
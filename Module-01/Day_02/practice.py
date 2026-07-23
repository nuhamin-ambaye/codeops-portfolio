#1. Temprature label

tempr=input("Enter temprature in celcius: ")
temp=int(tempr)
if (temp<15):
    print("Cold")
elif (temp>=15 and temp<=28):
    print("Warm")
else:
    print("Hot")

#2. Receipt loop

for i in range(1, 11):
        print(f"Receipt #N {i}")

#3. Even numbers

for i in range(1, 21):
     if (i%2==1):
          continue
     else:
          print(i)

#4. Discount function

def apply_discount(price, percent=10):
     discounted=price -(price*0.1)
     return discounted

pricee=input("Enter price: ")
price=int(pricee)
print(apply_discount(price))

#5. Countdown 
i=5
while (i>0):
    print(i)
    i=i-1
print("Liftoff!")
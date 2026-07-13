customers = [
("Almaz", 1500), ("Dawit", 700), ("Tigist", 200),
("Hanna", 1200), ("Samuel", 450),
]
def tier(balance):
    if balance >= 1000:
        return "Premium"
    elif balance >= 500:
        return "Standard"
    return "Basic"

for name, balance in customers:
    print(f"{name}: {tier(balance)} ({balance} ETB)")

premium=0
for name, balance in customers:
    if balance>=1000:
        premium+=1
print(f"Premium users: {premium}")

standard=0
for name, balance in customers:
    if balance<1000 and balance>=500:
        standard+=1
print(f"Standard users: {standard}")

basic=0
for name, balance in customers:
    if balance<500:
        basic+=1
print(f"Basic users: {basic}")


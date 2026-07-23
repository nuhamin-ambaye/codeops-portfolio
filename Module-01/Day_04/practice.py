#1. Book class

class Book:
    def __init__(self, title, author, pages):
        self.title=title
        self.author=author
        self.pages=pages
    
    def describe(self):
        print(f"{self.title} by {self.author} has {self.pages} pages.")

book1=Book("Alemawek", "Dr. Dawit Wondimagegn", 540)
book2=Book("Anne Frank-Diary of young girl", "Anne Frank", 266)

book1.describe()
book2.describe()

#2. Product class 

class Product:
    def __init__(self, name, price, quantity):
        self.name=name
        self.price=price
        self.quantity=quantity

    def restock(self, n):
        self.quantity+=n

    def sell(self, n):
        self.quantity-=n
    
#3. Making it private

class Product:
    def __init__(self, name, price, quantity):
        self.name=name
        self.price=price
        self.__quantity=quantity #the changes are here and ...

    def quantity(self): #...here
        return self.__quantity

    def restock(self, n):
        self.quantity+=n

    def sell(self, n):
        self.quantity-=n

#4. Validate

class Product:
    def __init__(self, name, price, quantity):
        self.name=name
        self.price=price
        self.__quantity=quantity

    @property
    def quantity(self): 
        return self.__quantity
    
    @quantity.setter
    def quantity(self, value):
        if value<0:
            print("Quantity value cannot be negative.")
        else:
            self.__quantity = value

    def restock(self, n):
        self.quantity+=n

    def sell(self, n):
        if self.__quantity-n<0:
            print("Not enough stock to sell.")
        self.quantity-=n

prod1=Product("Pen", 50, 30)
prod1.quantity=-2
prod1.sell(31)

#5. Proving independance

class Product:
    def __init__(self, name, price, quantity):
        self.name=name
        self.price=price
        self.__quantity=quantity

    @property
    def quantity(self): 
        return self.__quantity
    
    @quantity.setter
    def quantity(self, value):
        if value<0:
            print("Quantity value cannot be negative.")
        else:
            self.__quantity = value

    def restock(self, n):
        self.quantity+=n

    def sell(self, n):
        if self.__quantity-n<0:
            print("Not enough stock to sell.")
        self.quantity-=n

prod1=Product("Sharpner", 10, 30)
prod2=Product("Pencil", 20, 45)
prod3=Product("Rubber", 15, 50)

prod2.sell(10)

print(f"{prod1.name} remaining stock: {prod1.quantity}")
print(f"{prod2.name} remaining stock: {prod2.quantity}") #becomes 35
print(f"{prod3.name} remaining stock: {prod3.quantity}")
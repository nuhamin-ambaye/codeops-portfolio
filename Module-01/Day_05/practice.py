#1. Vehicle hierarchy 

class Vehicle:
    def __init__(self, make, model):
        self.make=make
        self.model=model
    
    def describe(self):
        print(f"This is {self.make} {self.model}.")

class Car(Vehicle):
    pass

class Truck(Vehicle):
    pass

car1=Car("Toyota", "CHR")
car1.describe()

#2. Using super

class Vehicle:
    def __init__(self, make, model):
        self.make=make
        self.model=model

class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity=capacity

    def describe(self):
            print(f"This is {self.make} {self.model} with {self.capacity} load capacity.")

truck1=Truck("Isuzu", "NPR", "12000 lbs")
truck1.describe()

#3. Override

class Vehicle:
    def __init__(self, make, model):
        self.make=make
        self.model=model
    
    def describe(self):
        print(f"This is {self.make} {self.model}.")

class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity=capacity

    def describe(self):
            print(f"This is {self.make} {self.model} with {self.capacity} capacity.")

truck1=Truck("Suzuki", "Espresso", "270 litres")
truck1.describe()

#4. Polymorphism

class Vehicle:
    def __init__(self, make, model):
        self.make=make
        self.model=model
    
    def describe(self):
        print(f"This is {self.make} {self.model}.")

class Car(Vehicle):
    pass

class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity=capacity

    def describe(self):
            print(f"This is {self.make} {self.model} with {self.capacity} capacity.")


truck1=Truck("Suzuki", "Espresso", "270 litres")
car1=Car("Toyota", "CHR")
truck2=Truck("Isuzu", "NPR", "12000 lbs")

vehicles=[
     truck1, car1, truck2
     ]

for vehicle in vehicles:
     vehicle.describe()

#5. Abstract method

from abc import ABC, abstractmethod

class Vehicle(ABC):
    def __init__(self, make, model):
        self.make=make
        self.model=model
    
    @abstractmethod
    def wheels(self):
        pass

class Car(Vehicle):
    def wheels(self):
        return 4

class Truck(Vehicle):
    def wheels(self):
        return 6
    
truck1=Truck("Suzuki", "Espresso")
car1=Car("Toyota", "CHR")

print(f"Car wheels: {car1.wheels()}")
print(f"Truck wheels: {truck1.wheels()}")
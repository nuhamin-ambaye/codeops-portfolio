#1. Spot the SRP violation

class ReportMaker:
    def make(self):
        return "Report content data"
    
class ReportSaver:
    def save_to_file(self, content, filename):
        return f"Saved report to {filename}"
    
class EmailReporter: 
    def send_email(self, content, recipent):
        return f"Emailed report to {recipent}"

#2. Refactor to OCP

from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def display_area(self):
        pass

class Square(Shape):
    def display_area(self, length):
        area=length*length
        return f"Area of the square: {area}"
    
#3. Write a singlton

class AppSetting:
    _instance=None

    def __new__(cls):
        if cls._instance is None:
            cls._instance=super().__new__(cls)
            cls._instance.currency="ETB"
        return cls._instance

setting1=AppSetting()
setting2=AppSetting()

print(setting1 is setting2)

#4. Write a factory

class Circle:
    pass
class Square:
    pass

class ShapeFactory:
    @staticmethod
    def create(kind):
        shapes={
            "circle": Circle,
            "square": Square
        }

        if kind in shapes:
            return shapes[kind]
        
#5. Write an observer pair

class NewsAgency:
    def __init__(self):
        self._subscribers=[]

    def attach(self, subscriber):
        self._subscribers.append(subscriber)

    def notify(self, news):
        for subscriber in self._subscribers:
            subscriber.update(news)

class EmailSubscriber:
    def update(self, news):
        print(f"Email alert: {news}")

class SMSSubscriber:
    def update(self, news):
        print(f"Email alert: {news}")
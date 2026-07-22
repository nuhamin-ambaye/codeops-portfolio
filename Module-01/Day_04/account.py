class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.__balance += amount

#TODO 1: withdraw(amount) 

    def withdraw(self, amount):
        if amount>self.__balance:
            print("Insufficient balance!")
        else:
            self.__balance-=amount

#TODO 2: statement()
    def statement(self):
        print(f"Owner name: {self.owner}")
        print(f"Account number: {self.account_number}")
        print(f"Balance: {self.__balance}")


acct1=Account("Abebe", 10001234, 30000)
acct1.withdraw(5000)
acct1.statement()
    
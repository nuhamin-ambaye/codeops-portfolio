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

    def withdraw(self, amount):
        if amount>self.__balance:
            print("Insufficient balance!")
        else:
            self.__balance-=amount

    def statement(self):
        print(f"Owner name: {self.owner}")
        print(f"Account number: {self.account_number}")
        print(f"Balance: {self.__balance}")

class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0, rate=0.05):
        super().__init__(owner, number, balance)
        self.rate = rate

    def add_interest(self):
        self.deposit(self.balance * self.rate)

    def statement(self):
        print(f"This is saving account.")

class CurrentAccount(Account):
    def __init__(self, owner, number, balance=0, overdraft=1000):
        super().__init__(owner, number, balance)
        self.overdraft = overdraft
    
    def statement(self):
        print(f"This is current account.")

acct1=CurrentAccount("Abebe", 10001234, 30000)
acct1.withdraw(5000)
acct1.statement()

acct2=SavingsAccount("Kebede", 10005678, 80000)
acct2.add_interest()
acct2.statement()
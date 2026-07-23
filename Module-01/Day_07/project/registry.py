class BankConfig:
    _instance=None

    def __new__(cls):
        if cls._instance is None:
            cls._instance=super().__new__(cls)
            cls._instance.interest_rate=0.05
            cls._instance.overdraft_limit=10000
        return cls._instance

from abc import ABC, abstractmethod

class Observer:
    @abstractmethod
    def update(self, account, message):
        pass
class SMSAlert(Observer):
    def update(self, account, message):
        print(f"Account {account.account_number}: {message}")
class Auditing(Observer):
    def update(self, account, message):
        print(f"Account {account.account_number} modified: {message}")

class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self._balance = balance
        self._observers=[]
        self.config=BankConfig()
        self.history_stack=[]

    def subscribe(self, observer):
        if observer not in self._observers:
            self._observers.append(observer)
    def notify(self, message):
        for observer in self._observers:
            observer.update(self, message)

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self._balance += amount
        self.history_stack.append({'type': 'deposit', 'amount': amount})
        self.notify(f"Deposited {amount}ETB \nNew balance: {self._balance}ETB")

    def withdraw(self, amount):
        pass

class SavingsAccount(Account):
   def withdraw(self, amount):
        if 0<amount<=self._balance:
           self._balance-=amount
           self.history_stack.append({'type': 'withdraw', 'amount': amount})
           self.notify(f"Withdrew {amount}ETB \nNew balance: {self._balance}ETB")
        else:
           print("Insufficient balance!")
        
class CurrentAccount(Account):
    def withdraw(self, amount):
        if 0<amount<=self._balance==self.config.overdraft_limit:
            self._balance-=amount
            self.history_stack.append({'type': 'withdraw', 'amount': amount})
            self.notify(f"Withdrew {amount}ETB \nNew balance: {self._balance}ETB")
        else:
            print("Overdraft limit exceeded!")

class AccountFactory:
    def create(kind, owner, number, balance):
        if kind=="saving":
            return SavingsAccount(owner, number, balance)
        elif kind=="current":
            return CurrentAccount(owner, number, balance)
        else:
            raise ValueError("Unknown account type!")

class AccountRegistry:
    def __init__(self):
        self.by_number={}
        self.order=[]

    def add (self, account):
        if account.account_number not in self.by_number:
            self.by_number[account.account_number]=account
            self.order.append(account.account_number)

    def find(self, number):
        return self.by_number.get(number)
    
    def list_all(self):
        result = []
        for number in self.order:
            account_object = self.by_number[number]
            result.append(account_object)
        return result
    
    def undo_last(self, number):
        account=self.find(number)

        if not account:
            print(f"Account {number} not found.")
            return False
        
        if not account.history_stack:
            print(f"No transactions to undo for account {number}.")

        last_tr=account.history_stack.pop()

        if last_tr['type']=='deposit':
            account._balance-=last_tr['amount']
            account._+=last_tr['amount']
            account.notify(f"Reversed withdrawal of {last_tr['amount']}ETB \nNew balance: {account.balance}ETB")

        elif last_tr['type']=='withdraw':
            account._balance += last_tx['amount']
            account.notify(f"Reversed withdrawal of {last_tr['amount']}ETB \nNew balance: {account._balance}ETB")

sms=SMSAlert()
audit=Auditing()
registry=AccountRegistry()

saving1=AccountFactory.create("saving", "Abebe", "SA10001234", 40000)
current1=AccountFactory.create("current", "Kebede", "CU10005678", 13000)

saving1.subscribe(sms)
saving1.subscribe(audit)
current1.subscribe(sms)

saving1.deposit(20000)
saving1.withdraw(16000)
current1.withdraw(6000)
registry.undo_last("SA10001234") 
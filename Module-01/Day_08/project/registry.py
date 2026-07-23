from abc import ABC, abstractmethod

class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 10000
        return cls._instance


class Observer(ABC):
    @abstractmethod
    def update(self, account, message):
        pass

class SMSAlert(Observer):
    def update(self, account, message):
        print(f"SMS -> Account {account.account_number}: {message}\n")

class Auditing(Observer):
    def update(self, account, message):
        print(f"AUDIT -> Account {account.account_number} modified: {message}\n")


class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self._balance = balance
        self._observers = []
        self.config = BankConfig()
        self.history_stack = []

    def subscribe(self, observer):
        if observer not in self._observers:
            self._observers.append(observer)

    def notify(self, message):
        for observer in self._observers:
            observer.update(self, message)

    @property
    def balance(self):
        return self._balance  

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self._balance += amount
        self.history_stack.append({'type': 'deposit', 'amount': amount})
        self.notify(f"Deposited {amount} ETB. New balance: {self._balance} ETB")

    def withdraw(self, amount):
        pass


class SavingsAccount(Account):
    def withdraw(self, amount):
        if 0 < amount <= self._balance:
            self._balance -= amount
            self.history_stack.append({'type': 'withdraw', 'amount': amount})
            self.notify(f"Withdrew {amount} ETB. New balance: {self._balance} ETB")
        else:
            print("Insufficient balance!")


class CurrentAccount(Account):
    def withdraw(self, amount):
        if 0 < amount <= (self._balance + self.config.overdraft_limit):
            self._balance -= amount
            self.history_stack.append({'type': 'withdraw', 'amount': amount})
            self.notify(f"Withdrew {amount} ETB. New balance: {self._balance} ETB")
        else:
            print("Overdraft limit exceeded!")


class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance):
        if kind == "saving":
            return SavingsAccount(owner, number, balance)
        elif kind == "current":
            return CurrentAccount(owner, number, balance)
        else:
            raise ValueError("Unknown account type!")

def binary_search(sorted_list, target):
    low = 0
    high = len(sorted_list) - 1
    while low <= high:
        mid = (low + high) // 2
        if sorted_list[mid] == target:
            return mid
        elif sorted_list[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1


class AccountRegistry:
    def __init__(self):
        self.by_number = {}
        self.order = []

    def add(self, account):
        if account.account_number not in self.by_number:
            self.by_number[account.account_number] = account
            self.order.append(account.account_number)

    def find(self, number):
        return self.by_number.get(number)

    def list_all(self):
        result = []
        for number in self.order:
            result.append(self.by_number[number])
        return result

    # Leaderboard
    def top_by_balance(self, n=5):
        accts = sorted(self.by_number.values(), key=lambda a: a.balance, reverse=True)
        return accts[:n]

    # Binary search is here
    def find_by_number(self, number):
        nums = sorted(self.by_number.keys())
        i = binary_search(nums, number)
        return self.by_number[nums[i]] if i >= 0 else None

    # Recursive transaction value sum helper
    def total_transactions(self, number):
        account = self.find_by_number(number)
        if not account or not account.history_stack:
            return 0

        def sum_recursive(history):
            if not history:
                return 0
            return history[0]['amount'] + sum_recursive(history[1:])

        return sum_recursive(account.history_stack)

    def undo_last(self, number):
        account = self.find(number)
        if not account:
            print(f"Account {number} not found.")
            return False
        if not account.history_stack:
            print(f"No transactions to undo for account {number}.")
            return False

        last_tr = account.history_stack.pop()
        if last_tr['type'] == 'deposit':
            account._balance -= last_tr['amount']
            account.notify(f"Reversed deposit of {last_tr['amount']} ETB. New balance: {account.balance} ETB")
        elif last_tr['type'] == 'withdraw':
            account._balance += last_tr['amount']  # Fixed typo from last_tx
            account.notify(f"Reversed withdrawal of {last_tr['amount']} ETB. New balance: {account.balance} ETB")

sms = SMSAlert()
audit = Auditing()
registry = AccountRegistry()

saving1 = AccountFactory.create("saving", "Abebe", "SA10001234", 40000)
current1 = AccountFactory.create("current", "Kebede", "CU10005678", 13000)

registry.add(saving1)
registry.add(current1)

saving1.subscribe(sms)
saving1.subscribe(audit)
current1.subscribe(sms)

saving1.deposit(20000)
saving1.withdraw(16000)
current1.withdraw(6000)

print("--Top Leaderboard Account Profile--")
for acct in registry.top_by_balance(1):
    print(f"  Owner: {acct.owner}, Balance: {acct.balance} ETB")

found_acct = registry.find_by_number("CU10005678")
if found_acct:
    print(f"\nBinary Search Found Account: Owner is {found_acct.owner}")

total_vol = registry.total_transactions("SA10001234")
print(f"\nRecursive Total Transaction Volume for Abebe: {total_vol} ETB")

registry.undo_last("SA10001234")
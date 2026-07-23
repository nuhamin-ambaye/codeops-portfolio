#1. Name the Big-O

#List index-O(1) -> goes to the wanted one directly.
#Single loop-O(n) -> loops through items one by one.
#Nested loop-O(n^2) -> the nested loop doubles the work.
#Dict lookup-O(1) -> finds the wanted directly by the key.
#Binary search-O(log n) -> splits the list to half for every step.

#2. List vs. dict lookup

import time

acct_list=[str(i) for i in range(100000)]
acct_dict={str(i): True for i in range(100000)}

target=99998

start_list=time.time()
target in acct_list
end_list=time.time()-start_list

start_dict=time.time()
target in acct_dict
end_dict=time.time()-start_dict

print(f"List's time: {end_list}")   #0.0013761520385742188
print(f"Dict's time: {end_dict}")   #0.0127613544464111330

#3. Build a stack

class Stack:
    def __init__(self):
        self.names=[]
    
    def push(self, name):
        self.names.append(name)

    def pop(self):
        return self.names.pop()
    
names=["Jerry", "Nuhamin", "Bitaniya"]
NStack=Stack() 

for name in names:
    NStack.push(name)

reversed_names=[]
for i in range(len(names)):
    reversed_names.append(NStack.pop())

print(f"Original: {names}")
print(f"Reversed: {reversed_names}")

#4. Build a queue

class Queue:
    def __init__(self):
        self.items=[]
    
    def enqueue(self, item):
        self.items.append(item)

    def dequeue(self):
        return self.items.pop(0)
    
Q=Queue()
Q.enqueue("Customer1")
Q.enqueue("Customer2")
Q.enqueue("Customer3")
Q.enqueue("Customer4")
Q.enqueue("Customer5")

print(Q.dequeue())
print(Q.dequeue())
print(Q.dequeue())

#5. Singly linked list

class Node:
    def __init__(self, data):
        self.data=data
        self.next=None

class LinkedList:
    def __init__(self):
        self.head=None

    def append(self, data):
        new_node=Node(data)
        if self.head is None:
            self.head=new_node
        else:
            last=self.head
            while last.next is not None:
                last=last.next
            last.next=new_node

LL=LinkedList()
LL.append("A")
LL.append("B")

print(LL.head.data)
print(LL.head.next.data)
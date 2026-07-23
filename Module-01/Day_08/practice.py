#1. Recursive sum

def total(num):
    if not num:
        return 0
    return num[0]+total(num[1:])

def count_down(n):
    if n<1:
        return
    print(n)
    count_down(n-1)

print(total([10, 20, 30]))
count_down(5)

#2. Binary search

def binary_search(items, target):
    low=0
    high=len(items)-1

    while low <=high:
        mid=(low+high)//2

        if items[mid]==target:
            return mid
        elif items[mid]<target:
            low=mid+1
        else:
            high=mid-1
    return -1

my_nums=[12, 28, 44, 56, 92, 106]
print(binary_search(my_nums, 92))
print(binary_search(my_nums, 10)) 

#3. Merge sort

def merge(left, right):
    result=[]
    i=j=0

    while i<len(left) and j<len(right):
        if left[i]<right[j]:
            result.append(left[i])
            i+=1
        else:
            result.append(right[j])
            j+=1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

def merge_sort(items):
    if len(items) <= 1:
        return items
    
    mid = len(items) // 2
    left_half = merge_sort(items[:mid])
    right_half = merge_sort(items[mid:])
    
    return merge(left_half, right_half)

import random

test_list = [random.randint(1, 100) for _ in range(10)]

print("Original List: ", test_list)
print("Merge Sorted: ", merge_sort(test_list))
print("Match: ", merge_sort(test_list) == sorted(test_list))


#4. Sort with a key

def get_balance(account):
    return account[1]

users = [("Abebe", 450), ("Kebede", 120), ("Marta", 3500)]
sorted_users = sorted(users, key=get_balance)

print("Sorted users:", sorted_users)

#5. Two pointers

def binary_search(sorted_list, target):
    low = 0
    high = len(sorted_list) - 1

    while low <= high:
        mid = (low + high) // 2
        mid_balance = sorted_list[mid][0] 
        
        if mid_balance == target:
            return mid
        else:
            low = mid + 1
            high = mid - 1
    return -1
users = [("Kebede", 120), ("Abebe", 450), ("Marta", 3500)]
sorted_users=(users)

print("Found target index:", binary_search(sorted_users, "Abebe"))
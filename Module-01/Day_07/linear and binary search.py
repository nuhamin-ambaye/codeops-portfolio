#Linear search
def linearSearch(array, target):
    for i in range(len(array)):
        if array[i]==target:
            return array[i]
    return -1

students_mark=[8, 7, 5, 10, 9, 6]
we_want=5

wanted=linearSearch(students_mark, we_want)

if wanted==-1:
    print("Not found")
else:
    print(f"The wanted result is {wanted}")


#Binary search
def binarySearch(array, target):
    left=0
    right=array[len(array)-1]
    while left<right:
        mid=(left+right)//2
        if mid==target:
            return mid
        elif mid>target:
            left=mid+1
        else:
            left=mid-1
odds=[1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
we_wantt=17

print(f"Found {binarySearch(odds, we_wantt)}.")
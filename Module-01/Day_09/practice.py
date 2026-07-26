#1. Build a BST
 
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def insert(root, value):
    if root==None:
        return Node(value)
    
    if value<root.value:
        root.left=insert(root.left, value)
    else:
        root.right=insert(root.right, value)
    return root

def in_order_traversal(root):
    if root!=None:
        in_order_traversal(root.left)   
        print(root.value, end=" ")      
        in_order_traversal(root.right)

balances=[500, 200, 700, 100, 300]
my_root=None

for b in balances:
    my_root=insert(my_root, b)

print("--Sorted--")
in_order_traversal(my_root)

#2. Tree depth

def height(node):
    if node is None:
        return 0
    
    left_height=height(node.left)
    right_height=height(node.right)

    return max(left_height, right_height)+1

print(f"\nHeight of the tree: {height(my_root)}")

#3. Graph BFS

from collections import deque

def bfs(graph, start):
    visited=set()
    queue=deque([start])
    visited.add(start)
    
    while queue:
        vertex=queue.popleft() 
       
        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
                
    return visited

my_graph={
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['E'],
    'D': [],
    'E': []
}

print(f"BFS Reachable vertices: {bfs(my_graph, 'A')}")

#4. Graph DFS

def dfs(graph, start, visited=None):
    if visited==None:
        visited=[] 
        
    if start!=visited:
        visited.append(start) 
        
        for neighbor in graph.get(start, []):
            dfs(graph, neighbor, visited)
            
    return visited

my_graph={
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['E'],
    'D': [],
    'E': []
}

print(f"DFS Visit Order: {dfs(my_graph, 'A')}")

#5. Priority queue

import heapq

pq = []

heapq.heappush(pq, (3, "Git"))
heapq.heappush(pq, (1, "Plan"))
heapq.heappush(pq, (5, "Deploy"))
heapq.heappush(pq, (2, "Code"))
heapq.heappush(pq, (4, "Launch"))

print("Processing queue by priority:")
while len(pq)>0:
    priority, task=heapq.heappop(pq)
    print(f"Priority {priority}: {task}")

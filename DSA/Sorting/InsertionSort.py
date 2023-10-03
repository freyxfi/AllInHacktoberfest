# Insertion sort in Python

def insertionSort(array):

    for step in range(1, len(array)):
        key = array[step]
        j = step - 1
        while j >= 0 and key < array[j]:
            array[j + 1] = array[j]
            j = j - 1
        
        
        array[j + 1] = key
arr = [9,23,57,98,12,45,87]
insertionSort(arr)
print('Sorted Array: ')
print(arr)
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break


#example array
arr = [4, 5, 2, 3, 1]
bubble_sort(arr)

for num in arr:
    print(num, end=" ")

print()

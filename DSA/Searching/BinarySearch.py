def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2  # Calculate the middle index
        
        if arr[mid] == target:
            return mid  # Return the index where the target element is found
        elif arr[mid] < target:
            left = mid + 1  # Search in the right half
        else:
            right = mid - 1  # Search in the left half
            
    return -1  # Return -1 if the target element is not in the list

# Example usage:
my_list = [1, 2, 3, 5, 7, 9]
target_element = 5
result = binary_search(my_list, target_element)
if result != -1:
    print(f"Element {target_element} found at index {result}.")
else:
    print(f"Element {target_element} not found in the list.")

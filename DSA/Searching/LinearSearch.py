def linear_search(arr, target):
    for i, element in enumerate(arr):
        if element == target:
            return i  # Return the index where the target element is found
    return -1  # Return -1 if the target element is not in the list

# Example usage:
my_list = [3, 5, 1, 9, 2, 7]
target_element = 5
result = linear_search(my_list, target_element)
if result != -1:
    print(f"Element {target_element} found at index {result}.")
else:
    print(f"Element {target_element} not found in the list.")

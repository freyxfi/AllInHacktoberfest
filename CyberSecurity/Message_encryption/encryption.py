# this code gives the ascii value of the message
def ascii_value_converter(message):
    ascii_str=''
    for char in message:
        av = str(ord(char))
        ascii_str=ascii_str+av
    print(ascii_str)

# this code give the xor value of the ascii value of the message with a key
def encryption(message):
    message_code=''.join(format(ord(char),'08b') for char in message)
    length=len(message_code)
    key=length*str(1)
    xor_value=''.join('1' if bit1 != bit2 else '0' for bit1, bit2 in zip(message_code, key))
    cipher=''.join(chr(int(xor_value[i:i+8], 2)) for i in range(0, len(xor_value), 8))
    print(xor_value)
    #printing the cipher requires an extension to show all kind of characters in terminal

message = input("Enter message: ")

#ascii_value_converter(message)
encryption(message)

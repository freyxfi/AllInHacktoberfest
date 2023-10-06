import os
from cryptography.fernet import Fernet

#key generation {can give a hardcoded value as well}
key = Fernet.generate_key()

#the file which you need to encrypt
fileName = "THE_FILE_PATH"

#encrytion

with open("thekey.key","wb") as thekey:
    thekey.write(key)

with open(fileName,"rb") as thefile:
    contents = thefile.read()
contents_encrypted = Fernet(key).encrypt(contents)
with open(fileName,"wb") as thefile:
    thefile.write(contents_encrypted)

#decryption

with open("thekey.key","rb") as key:
    secretkey = key.read()

with open(fileName,"rb") as thefile:
    contents = thefile.read()
contents_decrypted = Fernet(secretkey).decrypt(contents)
with open(fileName,"wb") as thefile:
    thefile.write(contents_decrypted)
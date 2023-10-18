import socket
import struct
import binascii

def analyze_ethernet_frame(data):
    dest_mac, src_mac, prototype = struct.unpack('! 6s 6s H', data[:14])
    return get_mac_address(dest_mac), get_mac_address(src_mac), socket.htons(prototype), data[14:]

def get_mac_address(bytes_address):
    bytes_str = map('{:02x}'.format, bytes_address)
    return ':'.join(bytes_str).upper()

def sniff_packets(interface):
    sock = socket.socket(socket.AF_PACKET, socket.SOCK_RAW, socket.htons(3))
    sock.bind((interface, 0x0003))

    while True:
        raw_data, addr = sock.recvfrom(65536)
        dest_mac, src_mac, eth_proto, data = analyze_ethernet_frame(raw_data)
        print(f"Source: {src_mac}, Destination: {dest_mac}, Protocol: {eth_proto}")
        print(binascii.hexlify(data))

interface = input("Enter the network interface to sniff (e.g., eth0): ")
sniff_packets(interface)

import socket

def scan_ports(target, ports):
    open_ports = []
    for port in ports:
        try:
            # Create a socket object
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(1)  # Set a timeout for the connection attempt

            # Attempt to connect to the target's IP address and port
            result = sock.connect_ex((target, port))

            # If the connection is successful, the port is open
            if result == 0:
                open_ports.append(port)

            sock.close()
        except KeyboardInterrupt:
            print("Scan terminated by user.")
            break
        except socket.gaierror:
            print("Hostname could not be resolved.")
            break
        except socket.error:
            print("Could not connect to server.")
            break

    return open_ports

if __name__ == "__main__":
    target_host = input("Enter the target host: ")
    target_ports = range(1, 1025)  # Scan common ports from 1 to 1024

    open_ports = scan_ports(target_host, target_ports)

    if open_ports:
        print("Open ports:")
        for port in open_ports:
            print(f"Port {port} is open.")
    else:
        print("No open ports found.")

#!/bin/bash

cd /tmp/

echo '[+] Downloading Required Dependencies'

wget http://ftp.us.debian.org/debian/pool/main/g/glibc/multiarch-support_2.19-18+deb8u10_amd64.deb -P /tmp/
wget http://security.debian.org/debian-security/pool/updates/main/o/openssl/libssl1.0.0_1.0.1t-1+deb8u12_amd64.deb -P /tmp/

echo '[+] Dependencies Downloaded'

echo '[+] Downloading Required Kernel Files'

wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.4-wily/linux-headers-4.4.0-040400_4.4.0-040400.201601101930_all.deb -P /tmp/
wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.4-wily/linux-headers-4.4.0-040400-generic_4.4.0-040400.201601101930_amd64.deb -P /tmp/
wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.4-wily/linux-image-4.4.0-040400-generic_4.4.0-040400.201601101930_amd64.deb -P /tmp/

echo '[+] Kernel Files Downloaded'

echo '[*] Installing Dependencies'

apt install /tmp/multiarch-support_2.19-18+deb8u10_amd64.deb
apt install /tmp/libssl1.0.0_1.0.1t-1+deb8u12_amd64.deb

echo '[*] Dependencies Installed'

echo '[*] Installing Kernel'

apt install /tmp/linux-headers-4.4.0-040400_4.4.0-040400.201601101930_all.deb
apt install /tmp/linux-headers-4.4.0-040400-generic_4.4.0-040400.201601101930_amd64.deb
apt install /tmp/linux-image-4.4.0-040400-generic_4.4.0-040400.201601101930_amd64.deb

echo '[*] Kernel Installed'

echo '[*] Uninstalling Old Kernel'
for LINE in `dpkg -l | grep linux | grep "5.4" | cut -d ' ' -f 3`; do apt purge -y $LINE; done

echo '[*] Updating Grub'
update-grub

echo '[*] Freezing Linux Kernel Updates'
for LINE in `dpkg -l | grep linux | grep -v "libse" | grep -v "console-setup" | cut -d ' ' -f 3`;do apt-mark hold $LINE; done

echo '[*] Kernel Downgrade Finished - Reboot Required!'

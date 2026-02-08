#Downloads
curl -s -o login.sh -L "https://raw.githubusercontent.com/JohnnyNetsec/github-vm/main/mac/login.sh"
#disable spotlight indexing
sudo mdutil -i off -a
#!/bin/bash

# 1. Tải và cài đặt Cloudflared
echo "Dang cai dat Cloudflared..."
brew install cloudflared

# 2. Cài đặt User và VNC (Giữ nguyên phần gốc của bạn)
echo "Dang cau hinh User va VNC..."
sudo mdutil -i off -a
sudo dscl . -create /Users/runneradmin
sudo dscl . -create /Users/runneradmin UserShell /bin/bash
sudo dscl . -create /Users/runneradmin RealName Runner_Admin
sudo dscl . -create /Users/runneradmin UniqueID 1001
sudo dscl . -create /Users/runneradmin PrimaryGroupID 80
sudo dscl . -create /Users/runneradmin NFSHomeDirectory /Users/tcv
sudo dscl . -passwd /Users/runneradmin P@ssw0rd!
sudo createhomedir -c -u runneradmin > /dev/null
sudo dscl . -append /Groups/admin GroupMembership runneradmin

# Kích hoạt VNC
sudo /System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Resources/kickstart -activate -configure -allowAccessFor -allUsers -privs -all
sudo /System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Resources/kickstart -configure -clientopts -setvnclegacy -vnclegacy yes 
# Đặt mật khẩu VNC là 'runnerrdp'
echo runnerrdp | perl -we 'BEGIN { @k = unpack "C*", pack "H*", "1734516E8BA8C5E2FF1C39567390ADCA"}; $_ = <>; chomp; s/^(.{8}).*/$1/; @p = unpack "C*", $_; foreach (@k) { printf "%02X", $_ ^ (shift @p || 0) }; print "\n"' | sudo tee /Library/Preferences/com.apple.VNCSettings.txt
# Restart VNC
sudo /System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Resources/kickstart -restart -agent -console
sudo /System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Resources/kickstart -activate

# 3. CHẠY QUICK TUNNEL (Không cần Token, Không cần Domain riêng)
# Lệnh này sẽ mở port 5900 và xuất ra log file
echo "Dang khoi dong Tunnel..."
cloudflared tunnel --url tcp://localhost:5900 --logfile ./tunnel.log &

# Đợi 10 giây để lấy Link
sleep 10

# 4. Lọc lấy đường dẫn trycloudflare.com từ log
TUNNEL_URL=$(grep -o 'trycloudflare.com[^"]*' ./tunnel.log | head -n 1)

# 5. Tạo file login.sh để hiển thị kết quả
cat <<EOF > login.sh
#!/bin/bash
echo "=========================================================="
echo "           MAC OS VM - QUICK TUNNEL READY                 "
echo "=========================================================="
echo "Username  : runneradmin"
echo "Password  : P@ssw0rd!"
echo "VNC Pass  : runnerrdp"
echo "----------------------------------------------------------"
echo "Tunnel URL: \$TUNNEL_URL"
echo "=========================================================="
echo "LENH KET NOI (Chay tren may cua ban):"
echo "cloudflared access tcp --hostname \$TUNNEL_URL --url localhost:5900"
echo "=========================================================="
EOF

chmod +x login.sh

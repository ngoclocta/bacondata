#!/bin/bash

# 1. Tải và cài đặt các thành phần cơ bản
# (Bỏ qua việc tải login.sh cũ vì nó không tương thích với Cloudflare)

# Disable spotlight indexing
sudo mdutil -i off -a

# 2. Tạo User mới (runneradmin)
sudo dscl . -create /Users/runneradmin
sudo dscl . -create /Users/runneradmin UserShell /bin/bash
sudo dscl . -create /Users/runneradmin RealName Runner_Admin
sudo dscl . -create /Users/runneradmin UniqueID 1001
sudo dscl . -create /Users/runneradmin PrimaryGroupID 80
sudo dscl . -create /Users/runneradmin NFSHomeDirectory /Users/tcv
sudo dscl . -passwd /Users/runneradmin P@ssw0rd!
sudo createhomedir -c -u runneradmin > /dev/null
sudo dscl . -append /Groups/admin GroupMembership runneradmin

# 3. Cài đặt và Cấu hình VNC
sudo /System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Resources/kickstart -activate -configure -allowAccessFor -allUsers -privs -all
sudo /System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Resources/kickstart -configure -clientopts -setvnclegacy -vnclegacy yes 

# Đặt mật khẩu VNC là 'runnerrdp'
echo runnerrdp | perl -we 'BEGIN { @k = unpack "C*", pack "H*", "1734516E8BA8C5E2FF1C39567390ADCA"}; $_ = <>; chomp; s/^(.{8}).*/$1/; @p = unpack "C*", $_; foreach (@k) { printf "%02X", $_ ^ (shift @p || 0) }; print "\n"' | sudo tee /Library/Preferences/com.apple.VNCSettings.txt

# Khởi động lại VNC
sudo /System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Resources/kickstart -restart -agent -console
sudo /System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Resources/kickstart -activate

# 4. Cài đặt Cloudflare Tunnel
brew install cloudflared

# Chạy Tunnel (Sử dụng token truyền vào từ biến $1)
# Dấu & giúp nó chạy ẩn
cloudflared tunnel run --token $1 &
sudo cloudflared service install eyJhIjoiYmQ0YTBhMjQzYzRmNDc4YjhkMzVjMDFhMTQyMDQ1MzYiLCJ0IjoiMjg2ODZlNzktNDcwNi00NTJhLTgzMTAtZDgxYWI5ZjJlMDdmIiwicyI6Ik1EZzJNalJpWmprdE0yTTNaUzAwWm1NeUxXRXhZekF0WVdOak5ESmhNV0k1TURNdyJ9

# 5. TẠO FILE LOGIN.SH MỚI (Sửa lỗi không hiện thông tin)
# Đoạn này sẽ tự viết ra file login.sh hiển thị đúng thông tin cần thiết
cat <<EOF > login.sh
#!/bin/bash
echo "=========================================================="
echo "           CLOUDFLARE TUNNEL - MACOS VM READY             "
echo "=========================================================="
echo "Username  : runneradmin"
echo "Password  : P@ssw0rd!"
echo "VNC Pass  : runnerrdp"
echo "----------------------------------------------------------"
echo "Public Host: Hãy dùng Domain bạn đã cài trong Cloudflare (VD: vnc.domain.com)"
echo "Local IP   : \$(ipconfig getifaddr en0)"
echo "=========================================================="
EOF

chmod +x login.sh

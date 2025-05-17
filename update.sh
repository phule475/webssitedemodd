#!/bin/bash
# Kiểm tra và build dự án (nếu dùng framework như React, Vue)
# Bỏ comment dòng dưới nếu cần build
# npm run build

# Thêm tất cả thay đổi
git add .

# Commit với thông điệp mặc định
git commit -m "Tự động cập nhật $(date)"

# Đẩy lên nhánh chính (thay 'main' bằng nhánh của bạn)
git push origin main
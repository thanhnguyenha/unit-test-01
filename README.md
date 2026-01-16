# Next.js Unit Test Project

Dự án Next.js với styled-components, tính năng đăng ký và đăng nhập sử dụng JSON Server.

## Cài đặt

```bash
npm install
```

## Cấu hình Environment Variables

1. Copy file `.env.example` thành `.env.local`:
```bash
cp .env.example .env.local
```

Hoặc tạo file `.env.local` với nội dung:
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# JSON Server URL (for server-side API routes)
JSON_SERVER_URL=http://localhost:3001

# App Configuration
NEXT_PUBLIC_APP_NAME=Next.js Movie App
```

**Lưu ý:**
- File `.env.local` đã được gitignore, không được commit lên repository
- `NEXT_PUBLIC_*` variables có thể được truy cập từ client-side
- Các biến không có prefix `NEXT_PUBLIC_` chỉ có thể truy cập từ server-side

## Chạy dự án

### 1. Chạy JSON Server (Terminal 1)
```bash
npm run json-server
```
JSON Server sẽ chạy tại `http://localhost:3001`

### 2. Chạy Next.js Dev Server (Terminal 2)
```bash
npm run dev
```
Ứng dụng sẽ chạy tại `http://localhost:3000`

## Tính năng

- ✅ Đăng ký tài khoản mới
- ✅ Đăng nhập
- ✅ Validation mật khẩu (tối thiểu 6 ký tự, có chữ hoa, chữ thường và số)
- ✅ Xác nhận lại mật khẩu
- ✅ Hiển thị/ẩn mật khẩu với icon con mắt
- ✅ UI đẹp với styled-components

## Cấu trúc dự án

```
src/
├── app/
│   ├── api/
│   │   ├── login/route.ts      # API endpoint đăng nhập
│   │   └── register/route.ts   # API endpoint đăng ký
│   ├── login/
│   │   └── page.tsx            # Trang đăng nhập
│   ├── register/
│   │   └── page.tsx            # Trang đăng ký
│   └── ...
├── components/
│   ├── LoginForm.tsx           # Component form đăng nhập
│   └── RegisterForm.tsx        # Component form đăng ký
└── ...
db.json                          # Database JSON Server
```

## API Endpoints

### POST /api/register
Đăng ký tài khoản mới

**Request:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "Đăng ký thành công",
  "user": {
    "id": 1,
    "username": "string",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### POST /api/login
Đăng nhập

**Request:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "Đăng nhập thành công",
  "user": {
    "id": 1,
    "username": "string",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Lưu ý

- JSON Server phải chạy trước khi sử dụng tính năng đăng ký/đăng nhập
- lệnh chạy server: npm run json-server
- Dữ liệu được lưu trong file `db.json`
- Password hiện tại được lưu dạng plain text (trong production nên hash password)

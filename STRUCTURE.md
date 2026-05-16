# Frontend Project Structure

## Cấu trúc thư mục

```
taskcloud-frontend/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── page.jsx        # Trang chính (Dashboard)
│   │   └── globals.css     # Global styles
│   ├── components/         # UI Components
│   │   ├── Button.jsx
│   │   ├── Button.module.css
│   │   ├── Navbar.jsx
│   │   ├── Navbar.module.css
│   │   ├── Sidebar.jsx
│   │   ├── Sidebar.module.css
│   │   ├── TaskCard.jsx
│   │   └── TaskCard.module.css
│   ├── hooks/             # Custom React Hooks
│   │   ├── useFetch.js    # Hook để fetch data
│   │   └── useTask.js     # Hook để quản lý tasks
│   ├── services/          # API Services
│   │   ├── apiClient.js   # Cấu hình Axios
│   │   └── taskService.js # API endpoints
│   └── public/            # Static files (images, logos)
├── .env.local             # Dev environment variables
├── .env.production        # Production environment variables
├── .gitignore             # Git ignore file
├── Dockerfile             # Docker configuration
└── package.json           # Dependencies & scripts
```

## File cấu hình

### .env.local
- `NEXT_PUBLIC_API_URL`: URL của Backend API khi chạy local (http://localhost:5000)

### .env.production
- `NEXT_PUBLIC_API_URL`: URL của Backend Azure App Service

### .gitignore
- Chặn: `node_modules`, `.next`, `.env`, file tạm

## Các Components

- **Button**: Button tái sử dụng với variants (primary, secondary)
- **Navbar**: Thanh điều hướng trên cùng
- **Sidebar**: Thanh bên trái
- **TaskCard**: Thẻ hiển thị thông tin task

## Custom Hooks

- **useFetch**: Fetch data từ API
- **useTask**: Quản lý state tasks (CRUD operations)

## API Services

- **apiClient**: Cấu hình Axios với interceptors (Auth, Error handling)
- **taskService**: Các hàm gọi API cho tasks và authentication

## Khởi động project

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build

# Start production
npm start
```

---
Để chỉnh sửa các file này, edit trực tiếp trong VS Code. Tất cả đã sẵn sàng!

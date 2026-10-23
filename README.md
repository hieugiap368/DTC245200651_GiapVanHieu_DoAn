# ĐỒ ÁN TRIỂN KHAI HỆ THỐNG CƠ SỞ DỮ LIỆU & GIÁM SÁT CONTAINER

**Họ và tên:** Giáp Văn Hiếu  
**Mã sinh viên:** DTC245200651  
**Lớp:** K15C6  
**Repository:** [hieugiap368/DTC245200651_GiapVanHieu_DoAn](https://github.com/hieugiap368/DTC245200651_GiapVanHieu_DoAn)

---

## 📌 TỔNG QUAN DỰ ÁN

Dự án đóng gói và triển khai một hệ thống ứng dụng Web hoàn chỉnh sử dụng **Docker** và **Docker Compose**. Hệ thống bao gồm ứng dụng Web (Node.js/Express), Cơ sở dữ liệu (PostgreSQL), Nginx Reverse Proxy và ngăn xếp giám sát, quản lý log tập trung chuyên nghiệp (Prometheus, Grafana, Loki, Promtail, cAdvisor).

### Các tính năng chính:
- **Bảo mật mạng (Network Isolation):** Phân chia mạng nội bộ `backend-net` cách ly CSDL và mạng công khai `frontend-net` phục vụ Web/Proxy.
- **Reverse Proxy:** Nginx làm cổng tiếp nhận truy cập duy nhất (Cổng 80) và định tuyến vào ứng dụng Web.
- **Giám sát độ đo (Monitoring):** cAdvisor thu thập thông số container $\rightarrow$ Prometheus lưu trữ độ đo $\rightarrow$ Grafana trực quan hóa biểu đồ (CPU, RAM, Network).
- **Quản lý Log tập trung (Logging):** Promtail thu gom log container $\rightarrow$ Loki xử lý log $\rightarrow$ Truy vấn log qua Grafana Explore (LogQL).

---

## 🏗 KẾT CẤU HỆ THỐNG (ARCHITECTURE)

Hệ thống bao gồm **8 Container** phối hợp hoạt động:

| Container | Dịch vụ | Vai trò / Chức năng | Cổng Public |
| :--- | :--- | :--- | :--- |
| `nginx_proxy` | Nginx | Reverse Proxy tiếp nhận truy cập | `80` |
| `web_app` | Node.js | Úng dụng Web hiển thị báo cáo & kết nối DB | Nội bộ (`3000`) |
| `db_app` | PostgreSQL | Cơ sở dữ liệu chính của hệ thống | Nội bộ (`5423`) |
| `pgadmin_app` | pgAdmin 4 | Giao diện quản trị cơ sở dữ liệu | `5050` |
| `cadvisor` | cAdvisor | Thu thập thông số hiệu năng container | Nội bộ (`8080`) |
| `prometheus` | Prometheus | Hệ thống lưu trữ & truy vấn độ đo (PromQL) | `9090` |
| `loki` | Grafana Loki | Trung tâm lưu trữ & quản lý log tập trung | Nội bộ (`3100`) |
| `promtail` | Promtail | Collector thu gom log gửi về Loki | Nội bộ |

---

## 📂 THƯ MỤC DỰ ÁN

```text
.
├── app/                      # Mã nguồn ứng dụng Web & Dockerfile
│   ├── index.js
│   ├── package.json
│   └── Dockerfile
├── nginx/                    # Cấu hình Reverse Proxy
│   └── nginx.conf
├── prometheus/               # Cấu hình thu thập độ đo Prometheus
│   └── prometheus.yml
├── promtail/                 # Cấu hình gom log Promtail
│   └── promtail-config.yml
├── loki/                     # Cấu hình lưu trữ Loki
│   └── loki-config.yml
├── docker-compose.yml        # File orchestrate toàn bộ container
└── README.md                 # Tài liệu hướng dẫn dự án

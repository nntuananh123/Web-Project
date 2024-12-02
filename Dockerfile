# Sử dụng Node.js làm base image
FROM node:21

# Thiết lập thư mục làm việc trong container
WORKDIR /app

USER root

# Sao chép package.json và package-lock.json trước
COPY package*.json ./

# Cài đặt react-scripts toàn cục
RUN npm install -g react-scripts

# Cài đặt các dependencies
RUN npm install

# Đảm bảo quyền thực thi cho các tệp trong container
RUN chmod -R 777 /app/node_modules/.bin && chmod -R 777 /app

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Cung cấp port mà ứng dụng sẽ chạy
EXPOSE 3000

# Chạy ứng dụng khi container khởi động
CMD ["npm", "start"]
const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error"); // Import ApiError class
const app = express();
const contactsRouter = require("./app/routes/contact.route");

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);

// Đường dẫn gốc hiển thị thông báo
app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application." });
});

// Middleware xử lý lỗi 404 - không tìm thấy route
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

// Middleware xử lý các lỗi khác
app.use((error, req, res, next) => {
  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;

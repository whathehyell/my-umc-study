import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { handleUserSignUp } from "./controllers/user.controller.js";
import regionRouter from "./routes/region.routes.js";
import storeRouter from "./routes/store.routes.js";
import missionRouter from "./routes/mission.routes.js";
import reviewRouter from "./routes/review.routes.js";
import { handleListStoreReviews } from "./controllers/review.controller.js";
import { DuplicateUserEmailError } from "./errors.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// --- 기본 미들웨어 ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"));

// --- 공통 응답 미들웨어 ---
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({
      resultType: "SUCCESS",
      error: null,
      success,
    });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

// --- 라우터 등록 ---
app.use("/api/v1/stores", storeRouter);
app.use("/api/v1/missions", missionRouter);
app.use("/api/v1", missionRouter); 
app.use("/api/v1", reviewRouter);
app.use("/api/v1/regions", regionRouter);

// 개별 라우트
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);
app.post("/api/v1/users/signup", handleUserSignUp);

// 기본 라우터
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// --- 에러 핸들러 미들웨어 (항상 맨 마지막) ---
app.use((err, req, res, next) => {
  console.error("[ERROR]", err);

  // 우리가 만든 에러 처리
  if (err instanceof DuplicateUserEmailError) {
    return res.error({
      errorCode: err.errorCode,
      reason: err.reason,
      data: err.data,
    });
  }

  // 예상 못 한 서버 에러 처리
  return res.status(500).json({
    resultType: "FAIL",
    error: {
      errorCode: "SERVER_ERROR",
      reason: err.message,
      data: null,
    },
    success: null,
  });
});

// --- 서버 실행 ---
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);

  if (app._router && app._router.stack) {
    console.log("📌 Registered routes:");
    app._router.stack.forEach((r) => {
      if (r.route && r.route.path) {
        console.log(Object.keys(r.route.methods)[0].toUpperCase(), r.route.path);
      }
    });
  }
});

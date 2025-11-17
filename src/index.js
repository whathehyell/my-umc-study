import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { handleUserSignUp } from "./controllers/user.controller.js";
import regionRouter from "./routes/region.routes.js"; // ✅ 중요! 정확한 경로
import storeRouter from "./routes/store.routes.js";
import missionRouter from "./routes/mission.routes.js";
import { handleListStoreReviews } from "./controllers/review.controller.js";
import reviewRouter from "./routes/review.routes.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/stores", storeRouter);
app.use("/api/v1", missionRouter);
app.use("/api/v1", reviewRouter);
app.use("/api/v1/missions", missionRouter);


// ✅ 반드시 listen 위에 있어야 함!
app.use("/api/v1/regions", regionRouter);

app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/users/signup", handleUserSignUp);

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);

  // ✅ 라우터가 존재할 때만 출력 (Node 22 버그 방지)
  if (app._router && app._router.stack) {
    console.log("✅ Registered routes:");
    app._router.stack.forEach((r) => {
      if (r.route && r.route.path) {
        console.log(Object.keys(r.route.methods)[0].toUpperCase(), r.route.path);
      }
    });
  } else {
    console.log("⚠️ No router stack detected yet.");
  }
});


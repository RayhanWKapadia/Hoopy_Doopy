import app from "./src/app";
import { connectToDatabase } from "./src/mongo";

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => console.log(`API running http://localhost:${PORT}`));
  } catch (e) {
    console.error("Startup failed", e);
    process.exit(1);
  }
})();
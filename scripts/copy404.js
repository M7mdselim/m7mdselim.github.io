import { copyFileSync, existsSync } from "fs";
import path from "path";

const src = path.join("dist", "index.html");
const dest = path.join("dist", "404.html");

try {
  if (!existsSync(src)) {
    console.error("❌ dist/index.html not found. Run build first.");
    process.exit(1);
  }
  copyFileSync(src, dest);
  console.log("✅ 404.html created (index.html preserved)");
} catch (err) {
  console.error("❌ Failed to create 404.html:", err);
}

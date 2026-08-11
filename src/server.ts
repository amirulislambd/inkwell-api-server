import { toNodeHandler } from "better-auth/node";
import app from "./app";
import { prisma } from "./lib/prisma";
import { auth } from "./lib/auth";
const PORT = process.env.PORT || 5000;

async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to DATABASE Successfully");
    app.all("/api/auth/*splat", toNodeHandler(auth));
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("an error occurred", error);
    await prisma.$disconnect;
    process.exit(1);
  }
}

main();

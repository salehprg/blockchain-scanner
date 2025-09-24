import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Database synchronized.");
    return AppDataSource.destroy();
  })
  .catch(err => {
    console.error("Failed to sync:", err);
    process.exit(1);
  });

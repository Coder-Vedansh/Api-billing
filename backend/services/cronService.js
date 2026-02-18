import cron from "node-cron";
import { generateAndSendReports } from "./reportGenerator.js";

export const startCronJobs = () => {
    // Run at 00:00 on the 1st day of every month
    cron.schedule("0 0 1 * *", () => {
        console.log("Running Monthly Report Job...");
        generateAndSendReports();
    });

    console.log("Cron Jobs Scheduled: Monthly Report (0 0 1 * *)");
};

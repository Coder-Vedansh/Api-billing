import User from "../models/User.js";
import APIKey from "../models/APIKey.js";
import Usage from "../models/Usage.js";
import { sendEmail } from "./emailService.js";

export const generateAndSendReports = async () => {
    console.log("Starting Monthly Report Generation...");
    const users = await User.find();

    for (const user of users) {
        await sendUserReport(user);
    }
    console.log("Monthly Reporting Complete.");
};

const sendUserReport = async (user) => {
    const keys = await APIKey.find({ user: user._id });
    const keyIds = keys.map(k => k._id);

    // Get usage for last month
    const startOfMonth = new Date();
    startOfMonth.setMonth(startOfMonth.getMonth() - 1);
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date();
    endOfMonth.setDate(0); // Last day of previous month
    endOfMonth.setHours(23, 59, 59, 999);

    const usage = await Usage.find({
        apiKey: { $in: keyIds },
        date: { $gte: startOfMonth, $lte: endOfMonth }
    }).populate("apiKey");

    let totalRequests = 0;
    let totalCost = 0;

    usage.forEach(u => {
        totalRequests += u.count;
        totalCost += u.count * (u.apiKey.rate || 0.01);
    });

    const html = `
        <h1>Monthly Usage Report</h1>
        <p>Hello ${user.name},</p>
        <p>Here is your API usage report for ${startOfMonth.toLocaleDateString()} - ${endOfMonth.toLocaleDateString()}.</p>
        
        <h2>Summary</h2>
        <ul>
            <li><strong>Total Requests:</strong> ${totalRequests}</li>
            <li><strong>Total Cost:</strong> $${totalCost.toFixed(2)}</li>
        </ul>
        
        <p>Thank you for using ApiBill!</p>
    `;

    await sendEmail(user.email, "Monthly API Usage Report", html);
};

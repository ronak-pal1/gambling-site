// services/cronJobs.ts
import cron from "node-cron";
import { AlertModel } from "../models/alerts.model";
import { UserModel } from "../models/user.model";

const checkExpiredAlerts = async () => {
  cron.schedule("* * * * *", async () => {
    // Every minute
    console.log("Checking for expired bets...");
    const alerts = await AlertModel.find({
      status: "Pending",
      endTime: { $lt: new Date() },
    });

    for (const alert of alerts) {
      const user = await UserModel.findById(alert.by);
      if (user) {
        user.coinBalance += alert.amount;
        await user.save();
      }

      alert.status = "expired";
      await alert.save();
    }
  });
};

export default checkExpiredAlerts;

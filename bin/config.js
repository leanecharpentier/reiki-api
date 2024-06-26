import { init as testConfig } from "./test-config.js";
import { init as devConfig } from "./dev-config.js";
import { init as prodConfig } from "./prod-config.js";

export function init() {
    return new Promise(async (resolve) => {
        const env = process.env.ENV ? process.env.ENV.trim() : "";
        if (env === "test") {
            await testConfig();
            return resolve("ok");
        }
        if (env === "prod") {
            await prodConfig();
            return resolve("ok");
        }
        await devConfig();
        return resolve("ok");
    });
}
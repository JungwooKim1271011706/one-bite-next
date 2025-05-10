import cron, { ScheduledTask } from 'node-cron';
import fs from 'fs';
import path from 'path';
import { syncCgcProducts } from './SyncCGCProducts';

const configPath = path.resolve(__dirname, "../config/cron-config.json");

let currentTask: ScheduledTask | null = null;

function initCgcSyncCronConfig() {
    const rawSyncData = fs.readFileSync(configPath, "utf-8");
    const config = JSON.parse(rawSyncData);
    const expression = config.cgcProductSync;

    if (!cron.validate(expression)) {
        console.log("유효하지 않은 크론식");
        return;
    }

    if (currentTask) {
        currentTask.stop();
        console.log("이전 작업 중지.");
    }

    currentTask = cron.schedule(expression, async () => {
        await syncCgcProducts();
    });
}
initCgcSyncCronConfig();

fs.watch(configPath, (eventType) => {
    if (eventType === 'change') {
        console.log("설정파일 변경 감지. 적용중...");
        initCgcSyncCronConfig();
    }
});
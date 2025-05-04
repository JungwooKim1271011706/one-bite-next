import cron from 'node-cron';
import { syncCgcProducts } from './SyncCGCProducts';

cron.schedule('0 0 * * * ', async () => {
    await syncCgcProducts();
});

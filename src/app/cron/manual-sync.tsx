import { syncCgcProducts } from "./SyncCGCProducts";

const nowDate = new Date();

console.log("현재시간 >>> : " + nowDate);

syncCgcProducts().then(() => {
    console.log("수동 데이터 동기화 실행... " + new Date());
    process.exit(0);
});
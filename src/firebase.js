import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDiTdcWv-PzF8u_ILkBy4Re6RkMH5I11-A",
  authDomain: "cloth-3a6df.firebaseapp.com",
  databaseURL: "https://cloth-3a6df-default-rtdb.firebaseio.com",
  projectId: "cloth-3a6df",
  storageBucket: "cloth-3a6df.appspot.com",
  messagingSenderId: "29445310981",
  appId: "1:29445310981:web:241be70ce0fdc5994eea6c",
  measurementId: "G-EWBEVEF3TP",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const storage = getStorage();

export default app;
export { storage };

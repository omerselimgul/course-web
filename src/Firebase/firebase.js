import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
const firebaseConfig = {};

const app = initializeApp(firebaseConfig);

export const FireBaseStorage = getStorage(app);

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBSTeDMQvk8VhLaE4B0dL2rIgBGIY4qHyE",
    authDomain: "upload-image-86bc3.firebaseapp.com",
    projectId: "upload-image-86bc3",
    storageBucket: "upload-image-86bc3.appspot.com",
    messagingSenderId: "1058086730286",
    appId: "1:1058086730286:web:33de62f3ac1ea4017b7dbf",
    measurementId: "G-0NBG8ZPHW9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDB = getAnalytics(app);
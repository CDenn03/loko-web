import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//import firebase from "firebase/app";
//import "firebase/firestore";

// const firebaseConfig = require("./firebaseConfig.js");

const config = {
  apiKey: "AIzaSyCbnYC2JqrRIIGRE7Rz1WCOIXOfHbMe76o",
  authDomain: "loko-202713.firebaseapp.com",
  databaseURL: "https://loko-202713.firebaseio.com",
  projectId: "loko-202713",
  storageBucket: "loko-202713.appspot.com",
  messagingSenderId: "700538727254",
  appId: "1:700538727254:web:b7455c803a750dfe1684f7",
  measurementId: "G-W9HRFJQTK9",
};

const app = initializeApp(config);

export const db = getFirestore(app);

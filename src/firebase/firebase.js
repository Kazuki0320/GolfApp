import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
	apiKey: "AIzaSyDzbRZHD3LVawRfgbQZw0JHfYfJ16GuIMM",
	authDomain: "golf-chat-b670a.firebaseapp.com",
	projectId: "golf-chat-b670a",
	storageBucket: "golf-chat-b670a.appspot.com",
	messagingSenderId: "343528863493",
	appId: "1:343528863493:web:a7eb25a74fadf8404e296c",
	measurementId: "G-9G4SHFN761"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.Timestamp;

export default firebase;
import firebase from 'firebase'

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
firebase.initializeApp(firebaseConfig);

export default firebase;
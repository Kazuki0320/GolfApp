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

let app;
let auth;
let firestore;

try {
	if (!firebase.apps.length) {
		app = firebase.initializeApp(firebaseConfig);
	} else {
		app = firebase.app();
	}
	
	auth = app.auth();
	firestore = app.firestore();
} catch (error) {
	console.error('Firebase initialization error:', error);
}

export { auth, firestore };
export const serverTimestamp = () => firebase.firestore.FieldValue.serverTimestamp();

// 遅延ロード用のモジュール（必要な場合のみ使用）
export async function loadFirebaseModules() {
	if (import.meta.env.PROD) {
		await Promise.all([
			import('firebase/app'),
			import('firebase/auth'),
			import('firebase/firestore')
		]);
	}
	return firebase;
}

export default firebase;
import firebase from 'firebase'

const config = {
	apiKey: "AIzaSyCcq8e73aQLGHctQ0JfJ27f6Tu6HIjoqqg",
	authDomain: "peps-id.firebaseapp.com",
	databaseURL: "https://peps-id.firebaseio.com",
	projectId: "peps-id",
	storageBucket: "peps-id.appspot.com",
	messagingSenderId: "842362591421",
	appId: "1:842362591421:web:dff370f7d15d897bb83fd4" //added
}


firebase.initializeApp(config)

export default firebase
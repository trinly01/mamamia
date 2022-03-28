import { initializeApp } from 'firebase/app'
import { connectFirestoreEmulator } from 'firebase/firestore'
// import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyAJky8AN_gip8iRFWisupMUiOKGNnK72DE',
  authDomain: 'mamamia-87e6a.firebaseapp.com',
  projectId: 'mamamia-87e6a',
  storageBucket: 'mamamia-87e6a.appspot.com',
  messagingSenderId: '94861311010',
  appId: '1:94861311010:web:e2f8fbf35f264c314d5e7b'
}
const db = initializeApp(config).firestore()

connectFirestoreEmulator(db, 'localhost', 8080)

export default db

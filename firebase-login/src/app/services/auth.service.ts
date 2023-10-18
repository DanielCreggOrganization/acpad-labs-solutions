import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Inject Firestore service. We need it to create a user profile in Firestore.
  constructor(private auth: Auth, private firestore: Firestore) {}

  // Sign up with email/password. Creates user in Firebase auth and adds user info to Firestore database
  async register({ email, password }: { email: string; password: string }) {
    try {
      const credentials = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      // In case the user is created successfully, create a document in `users` collection
      const ref = doc(this.firestore, `users/${credentials.user.uid}`);
      // Set the document. Data is written to the database.
      setDoc(ref, { email });
      return credentials;
    } catch (e) {
      return null;
    }
  }

  // Sign in with email/password
  async login({ email, password }: { email: string; password: string }) {
    try {
      // Sign in user. If successful, the user object is returned. Otherwise, null is returned.
      const credentials = await signInWithEmailAndPassword(
        this.auth, // <-- Injected AngularFireAuth service
        email, // <-- Email passed as parameter
        password // <-- Password passed as parameter
      );
      return credentials; // <-- Return the user object
    } catch (e) {
      return null;
    }
  }

  resetPw(email: string) {
    // Pass in athentication private and email address
    return sendPasswordResetEmail(this.auth, email);
  }

  logout() {
    return signOut(this.auth);
  }
}

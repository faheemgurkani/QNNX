// Firebase Storage helper (uses Vite env vars)
import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

// Replace these env vars in your .env (Vite):
// VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID,
// VITE_FIREBASE_STORAGE_BUCKET, VITE_FIREBASE_MESSAGING_SENDER_ID, VITE_FIREBASE_APP_ID

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

let storage
try {
  const app = initializeApp(firebaseConfig)
  storage = getStorage(app)
} catch (err) {
  // initialization will fail if env vars are missing; the functions below will surface errors
  console.warn('Firebase not initialized:', err.message)
}

export async function uploadFile(file, path) {
  if (!storage) throw new Error('Firebase storage not initialized. Check VITE_FIREBASE_* env vars')
  const fileRef = ref(storage, path)
  const uploadTask = uploadBytesResumable(fileRef, file)

  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed', null, (error) => reject(error), async () => {
      try {
        const url = await getDownloadURL(uploadTask.snapshot.ref)
        resolve(url)
      } catch (e) {
        reject(e)
      }
    })
  })
}

export async function uploadFiles(files = [], providerId = 'unknown'){
  // returns array of download URLs
  const uploads = Array.from(files).map((file, idx) => {
    const ext = file.name.split('.').pop()
    const path = `catalog/${providerId}/${Date.now()}_${idx}.${ext}`
    return uploadFile(file, path)
  })
  return Promise.all(uploads)
}

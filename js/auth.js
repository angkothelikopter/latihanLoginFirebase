
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { 
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, setDoc, doc } 
  from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyAxzi8pUv7AXMVKPBkDD4yNlpQ8IsQZXeU",
  authDomain: "sundafemboy.firebaseapp.com",
  projectId: "sundafemboy",
  storageBucket: "sundafemboy.firebasestorage.app",
  messagingSenderId: "105569254959",
  appId: "1:105569254959:web:e1f0f71b43ee116ba0d0da",
  measurementId: "G-KPQDBXFD41"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
window.register = async function () {
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const statusEl = document.getElementById("status");

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: user.email,
      createdAt: new Date()
    });

    statusEl.innerText = "✅ Register sukses! Silakan login.";
    statusEl.style.color = "green";
  } catch (err) {
    statusEl.innerText = "❌ " + err.message;
    statusEl.style.color = "red";
  }
}

window.login = async function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const statusEl = document.getElementById("status");

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    statusEl.innerText = "✅ Login sukses! Redirecting...";
    statusEl.style.color = "green";

    
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);

  } catch (err) {
    statusEl.innerText = "❌ " + err.message;
    statusEl.style.color = "red";
  }
}


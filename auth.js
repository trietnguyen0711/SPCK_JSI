
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCw4ZnKjxH5OzFbZSTa6UG5EBsIRfQMv8Y",
    authDomain: "jsi-spck-9f548.firebaseapp.com",
    projectId: "jsi-spck-9f548",
    storageBucket: "jsi-spck-9f548.appspot.com",
    messagingSenderId: "1068763988407",
    appId: "1:1068763988407:web:ba6a099f8a4b0b0750a832",
    measurementId: "G-RYWSB17416"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const signUp = async (email, password) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password)
        const userName = await result.user
        alert("successfully sign up" + " " + userName.email)
        localStorage.setItem("username", userName.email)
        location.reload()
    } catch (error) {
        alert("Fail to sign in! Please try again !")
    }
}

const signIn = async (email, password) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password)
        const userName = await result.user
        alert("successfully sign in" + " " + userName.email)
        localStorage.setItem("username", userName.email)
        location.reload()
    }
    catch (error) {
        console.log(error.message)
    }
}
async function getChannels() {
    try {
        let response = await fetch("https://66d5e290f5859a704267c69d.mockapi.io/chanelsList")
        let chanelsList = await response.json()
        return chanelsList
    } catch (error) {
        console.log(error)
    }
}

export { getChannels, signUp, signIn }
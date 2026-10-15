// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACH1a7GXr8pRNLdatDnDLxP91JxDSHn2c",
  authDomain: "mi-landing-3cc6b.firebaseapp.com",
  projectId: "mi-landing-3cc6b",
  storageBucket: "mi-landing-3cc6b.firebasestorage.app",
  messagingSenderId: "245671244163",
  appId: "1:245671244163:web:87866a8cbd1d92047d86b6"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Contact form submission handler
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();
    const submitBtn = contactForm.querySelector(".btn-submit");

    if (!nombre || !correo || !mensaje) {
      alert("Por favor completa todos los campos requeridos.");
      return;
    }

    try {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando...";
      }

      // Guardar el mensaje en la colección "mensajes" con los campos exactos requeridos
      await addDoc(collection(db, "mensajes"), {
        nombre,
        correo,
        mensaje,
        fecha: serverTimestamp()
      });

      alert("¡Mensaje enviado con éxito!");
      contactForm.reset();
    } catch (error) {
      console.error("Error al guardar en Firestore:", error);
      alert("Hubo un error al enviar el mensaje. Por favor intenta de nuevo.");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Enviar";
      }
    }
  });
}

// Importar SDKs modulares de Firebase desde el CDN oficial (v10)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Configuración de tu aplicación de Firebase
// (Reemplaza los valores con los que te proporciona tu consola de Firebase)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Cloud Firestore
const db = getFirestore(app);

// Manejo del formulario de contacto
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

      // Guardar el mensaje en la colección "contactos" de Firestore
      await addDoc(collection(db, "contactos"), {
        nombre,
        correo,
        mensaje,
        fecha: serverTimestamp()
      });

      alert("¡Mensaje enviado con éxito!");
      contactForm.reset();
    } catch (error) {
      console.error("Error al guardar en Firestore: ", error);
      alert("Hubo un error al enviar el mensaje. Revisa la consola o tu configuración de Firebase.");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Enviar";
      }
    }
  });
}

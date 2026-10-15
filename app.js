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
      return;
    }

    // Limpiar mensaje de error previo si existiera
    const previousError = contactForm.querySelector(".form-error");
    if (previousError) {
      previousError.remove();
    }

    // Mientras se guarda: desactiva el botón y muestra "Enviando..."
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";
    }

    try {
      // Guardar en Firestore en la colección "mensajes"
      await addDoc(collection(db, "mensajes"), {
        nombre,
        correo,
        mensaje,
        fecha: serverTimestamp()
      });

      // Éxito: cambiar el formulario por el mensaje de agradecimiento
      const mensajeExito = document.createElement("div");
      mensajeExito.id = "contact-form";
      mensajeExito.className = "contact-form success-message";

      const p = document.createElement("p");
      p.className = "success-text";

      // Asignar nombre y correo con textContent (no como HTML)
      const spanNombre = document.createElement("span");
      spanNombre.textContent = nombre;

      const spanCorreo = document.createElement("span");
      spanCorreo.textContent = correo;

      p.append(
        "¡Gracias por escribirme, ",
        spanNombre,
        "! Te respondo pronto a tu correo ",
        spanCorreo,
        "."
      );

      mensajeExito.appendChild(p);
      contactForm.replaceWith(mensajeExito);
    } catch (error) {
      console.error("Error al guardar en Firestore:", error);

      // Si falla: mostrar "No se pudo enviar, intenta de nuevo"
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "No se pudo enviar, intenta de nuevo";
      }

      let errorMsg = contactForm.querySelector(".form-error");
      if (!errorMsg) {
        errorMsg = document.createElement("p");
        errorMsg.className = "form-error";
        contactForm.appendChild(errorMsg);
      }
      errorMsg.textContent = "No se pudo enviar, intenta de nuevo";
    }
  });
}

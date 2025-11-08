// Reemplazá con la URL de tu Apps Script publicado
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxe9QtBN6huhMO9A4TsbAwX7G1GIP9dfBnpjiVwEkKJiAd56XD4iqh7cnVkKno03jD7/exec";

function enviarFeedback(e) {
  e.preventDefault();

  // Honeypot (antispam)
  if (document.getElementById('website').value) return false;

  const comentarios = document.getElementById('comentarios').value.trim();
  const email = document.getElementById('email').value.trim();
  const escucha = (document.querySelector('input[name="escucha_bien"]:checked') || {}).value || '';

  const msg = document.getElementById('feedbackMsg');
  msg.textContent = "Enviando…";

  fetch(APPS_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comentarios, escucha_bien: escucha, email })
  }).then(() => {
    msg.textContent = "¡Gracias por tu feedback!";
    document.getElementById('feedbackForm').reset();
  }).catch(err => {
    console.error(err);
    msg.textContent = "Error al enviar. Probá más tarde.";
  });

  return false;
}

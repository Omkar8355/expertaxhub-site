// ExpertTaxHub — shared behavior

const WHATSAPP_NUMBER = "919324787030";

function waLink(message){
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

document.addEventListener("DOMContentLoaded", () => {
  // Wire up all WhatsApp CTAs with contextual pre-filled messages
  document.querySelectorAll("[data-wa]").forEach(el => {
    const msg = el.getAttribute("data-wa") || "Hi ExpertTaxHub, I'd like to know more about your services.";
    el.setAttribute("href", waLink(msg));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => links.classList.remove("open"));
    });
  }

  // Contact form (static demo — no backend). Redirects the message to WhatsApp.
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector("#name").value.trim();
      const service = form.querySelector("#service").value;
      const message = form.querySelector("#message").value.trim();

      const composed = `Hi ExpertTaxHub, I'm ${name}. I need help with ${service}. ${message}`;
      const success = document.getElementById("form-success");
      if (success) {
        success.style.display = "block";
        success.innerHTML = `Thanks, ${name}. Click below to continue on WhatsApp and we'll take it from there.<br><br><a class="btn btn-whatsapp" href="${waLink(composed)}" target="_blank" rel="noopener noreferrer">Continue on WhatsApp</a>`;
      }
      form.reset();
    });
  }
});

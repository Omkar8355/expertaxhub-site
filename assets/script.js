const WHATSAPP_NUMBER = "919324787030";

function waLink(message){
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-wa]").forEach(el => {
    const msg = el.getAttribute("data-wa") || "Hi Expert Tax Hub, I'd like to know more about your services.";
    el.setAttribute("href", waLink(msg));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
    links.querySelectorAll("a:not(.has-dropdown > a)").forEach(a => {
      a.addEventListener("click", () => links.classList.remove("open"));
    });
  }

  // Mobile dropdown toggle (tap to expand Services submenu)
  document.querySelectorAll(".has-dropdown > a").forEach(trigger => {
    trigger.addEventListener("click", (e) => {
      if (window.innerWidth <= 700) {
        e.preventDefault();
        trigger.parentElement.classList.toggle("open");
      }
    });
  });

  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector("#name").value.trim();
      const service = form.querySelector("#service").value;
      const message = form.querySelector("#message").value.trim();
      const composed = `Hi Expert Tax Hub, I'm ${name}. I need help with ${service}. ${message}`;
      const success = document.getElementById("form-success");
      if (success) {
        success.style.display = "block";
        success.innerHTML = `Thanks, ${name}. Click below to continue on WhatsApp and we'll take it from there.<br><br><a class="btn btn-whatsapp" href="${waLink(composed)}" target="_blank" rel="noopener noreferrer">Continue on WhatsApp</a>`;
      }
      form.reset();
    });
  }
});

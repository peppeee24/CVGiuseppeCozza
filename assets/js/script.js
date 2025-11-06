(function () {
  'use strict';

  /**
   * 1. Gestione Preloader
   * Nasconde il preloader quando la pagina è completamente caricata.
   */
  window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      document.body.classList.add('loaded');
    }
  });


  /**
   * 2. Inizializzazione AOS (Animate On Scroll)
   */
  AOS.init({
    duration: 800,  // Durata animazione
    easing: 'ease-in-out', // Curva di animazione
    once: true,     // Anima solo una volta
    mirror: false,  // Non animare al ritorno
    offset: 100,    // Offset (in px) prima che l'animazione parta
  });


  /**
   * 3. Effetto Typing (Macchina da Scrivere) per l'Hero
   */
  const heroSubtitle = document.getElementById('hero-subtitle');
  if (heroSubtitle) {
    const textToType = "Informatica per il Management • Game Developer";
    let index = 0;

    function typeWriter() {
      if (index < textToType.length) {
        heroSubtitle.innerHTML += textToType.charAt(index);
        index++;
        setTimeout(typeWriter, 100); // Velocità di battitura (in ms)
      } else {
        // Opzionale: Rimuove il cursore lampeggiante alla fine
        // heroSubtitle.classList.add('typing-complete');
      }
    }
    
    // Avvia l'effetto dopo un breve ritardo
    setTimeout(typeWriter, 1000);
  }


  /**
   * 4. Gestione Navbar allo Scroll (Invariata)
   * Aggiunge classe 'scrolled' alla navbar.
   */
  const mainNav = document.getElementById('mainNav');
  if (mainNav) {
    const updateNavbar = () => {
      if (window.scrollY > 50) {
        mainNav.classList.add('scrolled');
      } else {
        mainNav.classList.remove('scrolled');
      }
    };
    updateNavbar();
    document.addEventListener('scroll', updateNavbar);
  }


  /**
   * 5. Attivazione ScrollSpy di Bootstrap (Invariato)
   */
  const scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#mainNav',
    offset: 100
  });


  /**
   * 6. Validazione Form (Invariato)
   */
  var forms = document.querySelectorAll('.needs-validation');
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });

})();
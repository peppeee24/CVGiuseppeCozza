// Schermata di Caricamento
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
    }
});

// Animazione del menu burger
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');

if (burger) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
}

// Chiudi il menu mobile al clic su un link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            if (burger) {
                burger.classList.remove('toggle');
            }
        }
    });
});

// Popup Modal
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const closeBtn = document.querySelector('.close-btn');

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        if (popup) {
            popup.style.display = 'none';
        }
    });
}

window.addEventListener('click', (e) => {
    if (popup && e.target == popup) {
        popup.style.display = 'none';
    }
});

// Invia il messaggio utilizzando EmailJS
const form = document.getElementById('contact-form');
if (form) { // Verifica se il form esiste sulla pagina
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Ottieni i dati dal form
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const messaggio = document.getElementById('messaggio').value;

        // Parametri per EmailJS
        const templateParams = {
            from_name: nome,
            from_email: email,
            message: messaggio
        };

        emailjs.send('CV_ServiceGmail', 'CV_Email', templateParams)
            .then(function(response) {
                // Mostra il popup di successo
                if (popupMessage && popup) {
                    popupMessage.textContent = 'Messaggio inviato con successo!';
                    popup.style.display = 'block';
                }
                form.reset();
            }, function(error) {
                // Mostra il popup di errore
                if (popupMessage && popup) {
                    popupMessage.textContent = 'Si è verificato un errore. Per favore, riprova più tardi.';
                    popup.style.display = 'block';
                }
                console.error('Errore nell\'invio dell\'email:', error);
            });
    });
}

/* Sezione Dinamica per `project.html` */

// Verifica se siamo nella pagina `project.html` tramite la classe `project-detail`
if (document.body.classList.contains('project-detail')) {
    // Carica i dati del progetto
    document.addEventListener("DOMContentLoaded", function() {
        const projectId = getURLParameter('id');
        const project = projects[projectId];

        if (project) {
            // Popola i dati del progetto
            const titleElement = document.getElementById('project-title');
            const dateElement = document.getElementById('project-date');
            const descriptionElement = document.getElementById('project-description');
            const videoSource = document.getElementById('project-video-source');
            const sliderImagesContainer = document.querySelector('.slider-images');

            if (titleElement) titleElement.textContent = project.title;
            if (dateElement) dateElement.textContent = project.date;
            if (descriptionElement) descriptionElement.textContent = project.description;
            if (videoSource) {
                videoSource.src = project.video;
                videoSource.parentElement.load(); // Carica il video
            }

            if (sliderImagesContainer) {
                // Pulire eventuali immagini pre-esistenti
                sliderImagesContainer.innerHTML = '';
                project.images.forEach((imgSrc, index) => {
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = project.title + ' - Immagine ' + (index + 1);
                    if (index === 0) img.classList.add('active'); // Mostra solo la prima immagine
                    sliderImagesContainer.appendChild(img);
                });
            }

            // Inizializza lo slider
            initializeSlider();
        } else {
            // Progetto non trovato, mostra un messaggio o reindirizza
            const container = document.querySelector('.project-detail-section .container');
            if (container) {
                container.innerHTML = "<h2>Progetto non trovato.</h2>";
            }
        }
    });

    // Funzione per ottenere i parametri URL
    function getURLParameter(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        const regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
              results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    // Funzione per inizializzare lo slider delle immagini
    function initializeSlider() {
        const sliderImages = document.querySelectorAll('.slider-images img');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentIndex = 0;

        // Mostra solo l'immagine corrente
        function showImage(index) {
            sliderImages.forEach((img, i) => {
                img.classList.toggle('active', i === index);
            });
        }

        // Inizializza lo slider mostrando la prima immagine
        showImage(currentIndex);

        // Event listener per il pulsante precedente
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex === 0) ? sliderImages.length - 1 : currentIndex - 1;
                showImage(currentIndex);
            });
        }

        // Event listener per il pulsante successivo
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex === sliderImages.length - 1) ? 0 : currentIndex + 1;
                showImage(currentIndex);
            });
        }
    }
}

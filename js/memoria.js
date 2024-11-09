class Memoria {

    constructor() {
        
        // Elemento JSON
        this.elements = { 
            cards: [
                { element: "RedBull", source: "https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg" },
                { element: "RedBull", source: "https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg" },
                { element: "McLaren", source: "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg" },
                { element: "McLaren", source: "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg" },
                { element: "Alpine", source: "https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg" },
                { element: "Alpine", source: "https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg" },
                { element: "AstonMartin", source: "https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg" },
                { element: "AstonMartin", source: "https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg" },
                { element: "Ferrari", source: "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg" },
                { element: "Ferrari", source: "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg" },
                { element: "Mercedes", source: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg" },
                { element: "Mercedes", source: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg" }
            ]
        };

        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;

        this.shuffleElements(this.elements.cards);
        this.createElements();
        this.addEventListeners();
    }

    // Método para barajar utilizando método de Durstenfeld
    shuffleElements(cards) {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
    }

    // Método para resetear el tablero tras finalizar un "turno" de interacción del usuario
    unflipCards() {
        this.lockBoard = true;
        setTimeout(() => {
            this.firstCard.setAttribute('data-state', 'hidden');
            this.secondCard.setAttribute('data-state', 'hidden');
            this.resetBoard();
          }, 2000); // Introducido delay de 2 segundos
    }

    // Resetea el tablero tras voltear dos cartas distintas
    resetBoard() {
        this.firstCard = null;
        this.secondCard = null;
        this.hasFlippedCard = false;
        this.lockBoard = false;
    }

    // Comprueba que las cartas volteadas son iguales y actúa en consecuencia
    checkForMatch() {
        this.firstCard.getAttribute('data-element') === this.secondCard.getAttribute('data-element') ? this.disableCards() : this.unflipCards();
    }

    // Deshabilita las cartas que ya han sido emparejadas correctamente
    disableCards() {
        this.firstCard.setAttribute('data-state', 'revealed');
        this.secondCard.setAttribute('data-state', 'revealed');
        this.resetBoard();
    }

    // Crea los elementos del JSON para añadir las cartas al HTML
    createElements() {
        const section = document.createElement('section');
        section.setAttribute('data-game', 'memory-game');

        const h2 = document.createElement('h2');
        h2.textContent = "Juego de memoria";;
        section.appendChild(h2);

        this.elements.cards.forEach(card => {
            const article = document.createElement('article');
            article.setAttribute('data-element', card.element);
            article.setAttribute('data-state', 'hidden');

            const h3 = document.createElement('h3');
            h3.textContent = "Tarjeta de memoria"; // Tarjeta sin voltear
            article.appendChild(h3);

            const img = document.createElement('img');
            img.src = card.source;
            img.alt = card.element;
            article.appendChild(img);

            section.appendChild(article);
        });

        document.querySelector('main').appendChild(section);
    }

    // Añade funcionalidad al pulsar sobre las cartas
    addEventListeners() {
        const cards = document.querySelectorAll('[data-game=memory-game]>article');
        cards.forEach(card => {
            card.onclick = this.flipCard.bind(card, this)
        });
    }

    // Voltea la carta y muestra la imagen
    flipCard(game) {
        const card = this;
        const state = card.getAttribute('data-state');

        if (state === 'revealed' || game.lockBoard || card === game.firstCard) {
            return;
        }

        card.setAttribute('data-state', 'flip');

        if (!game.hasFlippedCard) {
            game.hasFlippedCard = true;
            game.firstCard = card;
        } else {
            game.secondCard = card;
            game.checkForMatch(game.firstCard, game.secondCard);
        }
    }
}
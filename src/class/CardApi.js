export class CardApi{
    url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
    url_shuffle;
    url_draw_1;

    value = {
        "A": 0,
        "1": 1,
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 7,
        "8": 8,
        "9": 9,
        "0": 10,
        "J": 10,
        "Q": 10,
        "K": 10
    }

    constructor(span_score,add_card,carte_rest) {
        this.span_score = document.getElementById("score");
        this.div_cartes = document.getElementById("add_card");
        this.carte_rest = document.getElementById("carte_rest");
        this.initUrls();
    }

    async initUrls(){
        //On récupère l'id du deck et on initialise les url "shuffle" et "draw"
        this.pPromise = fetch(this.url)
            .then((response) => response.json())
            .then((data) => {
                this.url_shuffle = `https://deckofcardsapi.com/api/deck/${data.deck_id}/shuffle/?remaining=true`;
                this.url_draw_1 = `https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=1`;
            });
    }

    async shuffleDeck() {
        const response = await fetch(this.url_shuffle);
        const shuffle = await response.json();
        return shuffle;
    }

    createDivCard(card) {
        const new_div_image = document.createElement("div");
        //new_div_image.style.position = "absolute";
        const newImg = new Image(150, 200);
        newImg.style.transform = "rotate(-10deg)";

        /**** SCORE DE LA CARTE ****/
        let scoreX = card.code.charAt(0);
        let textScoreX = document.createElement("p");
        textScoreX.innerText = "Valeur = "+this.value[scoreX];

        /**** AJOUT IMAGE ****/
        newImg.src = card.image;
        new_div_image.appendChild(newImg);
        new_div_image.appendChild(textScoreX);
        this.div_cartes.appendChild(new_div_image);
        new_div_image.animate(
            [
                // keyframes
                { transform: 'translateY(-300px)' },
                { transform: 'translateY(0px)' }
            ], {
                // timing options
                duration: 1000,
                iterations: 1
            }
        );
    }

    async getNewCard() {
        let card;
        await fetch(this.url_draw_1)
            .then((response) => response.json())
            .then((data) => {
                this.carte_rest.innerHTML = data.remaining;
                card = data.cards[0];
            });
        return card;
    }
}
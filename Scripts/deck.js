export default class Deck {

    constructor(c, n) {
        this.cards = c
        this.name = n
        this.AssignElements()
    }

    get CardsInDeck() {
        return this.cards.length
    }

    AssignElements() {
        this.AssignQueryPrefix()
        this.AssignCardName()
        this.AssignCardDescription()
        this.AssignCardBullets()
        //if(this.name == 'Situation') this.AssignCardQuotation()
    }

    AssignQueryPrefix() {
        if (this.name == 'Ability') {
            this.queryPrefix = "#abil-"
        } else if (this.name == 'Situation') {
            this.queryPrefix = "#sit-"
        }
    }

    AssignCardDescription() {
        this.cardDescriptionElements = [document.querySelector(this.queryPrefix + "desc-1a"),
        document.querySelector(this.queryPrefix + "desc-1b"),
        document.querySelector(this.queryPrefix + "desc-1c"),
        document.querySelector(this.queryPrefix + "desc-2a"),
        document.querySelector(this.queryPrefix + "desc-2b"),
        document.querySelector(this.queryPrefix + "desc-2c"),
        document.querySelector(this.queryPrefix + "desc-3a"),
        document.querySelector(this.queryPrefix + "desc-3b"),
        document.querySelector(this.queryPrefix + "desc-3c")
        ]
    }

    AssignCardBullets() {
        this.cardBulletElements = [document.querySelector(this.queryPrefix + "bullet-1"),
        document.querySelector(this.queryPrefix + "bullet-2"),
        document.querySelector(this.queryPrefix + "bullet-3")
        ]
    }

    AssignCardName() {
        this.cardNameElement = document.querySelector(this.queryPrefix + "name")
    }

    AssignCardQuotation() {
        this.cardQuotationElement = document.querySelector(this.queryPrefix + "quotation")
        this.cardQuotationAuthorElement = document.querySelector(this.queryPrefix + "author")
    }

    RenderCard() {
        this.cardNameElement.textContent = this.cards[0].name

        let brokenString = BreakString(this.cards[0].description1)
        for (let i = 0; i < this.cardDescriptionElements.length; i++) {
            if (i >= 6) {
                brokenString = BreakString(this.cards[0].description3)
            } else if (i >= 3) {
                brokenString = BreakString(this.cards[0].description2)
            }
            this.cardDescriptionElements[i].textContent = brokenString[i % 3]
        }

        /*if(this.name == 'Situation'){
            this.cardQuotationElement.textContent = this.cards[0].quotation
            this.cardQuotationAuthorElement.textContent = this.cards[0].author
        }*/

        for (let i = 0; i < this.cardBulletElements.length; i++) {
            this.cardBulletElements[i].style.visibility = 'visible'
        }
    }

    Discard() {
        this.cards.shift()
    }

    Shuffle() {
        for (let i = this.CardsInDeck - 1; i > 0; i--) {

            //Find Indexes
            let newIndex = Math.floor(Math.random() * (i + 1))
            let oldCard = this.cards[newIndex]

            //Swap Cards
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldCard
        }
    }
}
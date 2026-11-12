async function get_articles () {
    try {
        const response = await fetch("../data/articles.json")
        const articles = await response.json()
        
        return articles
    } catch (error) {
        console.error(error.message)
    }
}

function out_articles(articles) {
    const CardTypes = {
        S: "s", M: "m", L: "l"
    }

    function get_card_template (cardType) {
        switch(cardType) {
            case CardTypes.S:
                return document.getElementById("article-card-s-template")
            case CardTypes.M:
                return document.getElementById("article-card-m-template")
            case CardTypes.L:
                return document.getElementById("article-card-l-template")
            default:
                console.error(`Был получен неизвестный тип карточки: ${cardType}`)
        }
    }

    function create_card(article, cardType) {
        const ArticleCardTemplate = get_card_template(cardType)
        
        const Main = document.querySelector("main")
        const card = ArticleCardTemplate.content.cloneNode(true)

        switch(cardType) {
            case CardTypes.M:
                card.querySelector("img").setAttribute("alt", article.altImage)
                break
        }

        card.querySelector("h3").textContent = article.heading
        card.querySelector("time").setAttribute("datetime", article.publicationDate)
        card.querySelector("time").textContent = article.publicationDate

        Main.append(card)
    }

    for (let id = articles.length - 1; id >= 0; id--) {
        const article = articles[id];
        create_card(article, CardTypes.M)
    }
}

(get_articles())
    .then((articles) => out_articles(articles))
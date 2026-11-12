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
    function create_card(article) {
        const ArticleCardTemplate = document.getElementById("article-card-template")
        const Main = document.querySelector("main")
        const card = ArticleCardTemplate.content.cloneNode(true)

        card.querySelector("h3").textContent = article.heading
        card.querySelector("date").textContent = article.publicationDate

        Main.append(card)
    }

    for (let id = articles.length - 1; id >= 0; id--) {
        const article = articles[id];
        create_card(article)
    }
}

(get_articles())
    .then((articles) => out_articles(articles))
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
    for (let id = articles.length - 1; id >= 0; id--) {
        const article = articles[id];

        console.log(article.heading, article.id)
    }
}

(get_articles())
    .then((articles) => out_articles(articles))
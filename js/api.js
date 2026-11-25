async function get_articles () {
    try {
        const response = await fetch("/data/articles.json");
        const articles = await response.json();
        
        return articles;
    } catch (error) {
        console.error(error.message);
    }
}

async function get_article (index) {
    try {
        const articles = await get_articles()
        const article = articles[index]
        
        return article;
    } catch (error) {
        console.error(error.message);
    }
}

async function get_article_of_the_day() {
    try {
        const response = await fetch("/data/article-of-the-day.json");
        const parsedJSON = await response.json();
        const articleOfTheDay = await get_article(parsedJSON.id);

        return articleOfTheDay;
    } catch (error) {
        console.error(error.message);
    }
}
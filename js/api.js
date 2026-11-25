async function getArticles () {
    try {
        const response = await fetch("/data/articles.json");
        const articles = await response.json();
        
        return articles;
    } catch (error) {
        console.error(error.message);
    }
}

async function getArticle (index) {
    try {
        const articles = await getArticles()
        const article = articles[index]
        
        return article;
    } catch (error) {
        console.error(error.message);
    }
}

async function getArticleOfTheDay() {
    try {
        const response = await fetch("/data/article-of-the-day.json");
        const parsedJSON = await response.json();
        const articleOfTheDay = await getArticle(parsedJSON.id);

        return articleOfTheDay;
    } catch (error) {
        console.error(error.message);
    }
}
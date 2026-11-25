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
        const articles = await getArticles();
        const article = articles[index];
        
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

async function getArticlesByFilters(filters) {
    try {
        const articles = await getArticles();

        return articles.filter((article) => {
            const publicationDate = Temporal.PlainDate.from(`${article.publicationDate}`);

            if (filters.fromDate && Temporal.PlainDate.compare(publicationDate, filters.fromDate) < 0) {
                return false;
            }

            if (filters.untilDate && Temporal.PlainDate.compare(publicationDate, filters.untilDate) > 0) {
                return false;
            }

            if (filters.keywords && !checkForKeywordsIn(article, filters.keywords)) {
                return false;
            }

            return true;
        });
    } catch (error) {
        console.error(error.message);
        return [];
    }
}

function checkForKeywordsIn(article, keywords) {
    const needle = keywords.toLowerCase();

    const contains = (text) =>
        typeof text === "string" && text.toLowerCase().includes(needle);

    if (contains(article.heading)) {
        return true
    };

    if (contains(article.coverImage.altText)) {
        return true
    };

    if (Array.isArray(article.content)) {
        return article.content.some((element) => {
            if (typeof element === "string") {
                return contains(element)
            } else if (element && typeof element === "object") {
                return contains(element.altText)
            } else {
                return false
            }
        });
    }

    return false;
}
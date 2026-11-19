async function get_articles () {
    try {
        const Response = await fetch("/data/articles.json");
        const Articles = await Response.json();
        
        return Articles;
    } catch (error) {
        console.error(error.message);
    }
}
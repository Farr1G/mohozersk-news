(async () => {
    const articles = await getArticles();
    const columns = prepareColumns(articles, true);
    renderColumns(columns, true);
})();

(async () => {
    const ArticleOfTheDay = await getArticleOfTheDay();
    const Main = document.querySelector("main");
    renderCard(ArticleOfTheDay, CARD_TYPES.L, Main);
})();
(async () => {
    const articles = await get_articles();
    const columns = prepareColumns(articles, true);
    renderColumns(columns, true);
})();

(async () => {
    const ArticleOfTheDay = await get_article_of_the_day();
    const Main = document.querySelector("main");
    renderCard(ArticleOfTheDay, CARD_TYPES.L, Main);
})();
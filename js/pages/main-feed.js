(async () => {
    const Articles = await get_articles();
    const Columns = prepare_columns(Articles, true);
    render_columns(Columns, true);
})();

(async () => {
    const ArticleOfTheDay = await get_article_of_the_day();
    const Main = document.querySelector("main");
    render_card(ArticleOfTheDay, CARD_TYPES.L, Main);
})();
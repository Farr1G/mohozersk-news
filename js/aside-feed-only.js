(async () => {
    const articles = await getArticles();
    const columns = prepareColumns(articles, false);
    renderColumns(columns, false);
})();
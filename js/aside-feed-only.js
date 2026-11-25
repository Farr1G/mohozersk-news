(get_articles())
    .then((articles) => prepareColumns(articles, false))
    .then((columns) => renderColumns(columns, false))
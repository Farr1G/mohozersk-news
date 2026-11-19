(get_articles())
    .then((Articles) => prepare_columns(Articles, true))
    .then((Columns) => render_columns(Columns, true))
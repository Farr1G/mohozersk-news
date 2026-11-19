(get_articles())
    .then((Articles) => prepare_columns(Articles, false))
    .then((Columns) => render_columns(Columns, false))
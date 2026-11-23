const CARD_TYPES = {
        S: "s", M: "m", L: "l"
}

function render_columns (Columns, hasMainColumn) {
    Columns.AsideColumn.forEach((Article) => {
        const Aside = document.querySelector("aside");
        render_card(Article, CARD_TYPES.S, Aside);
    })

    if (hasMainColumn) {
        Columns.MainColumn.forEach((Article) => {
        const Main = document.querySelector("main")
            render_card(Article, CARD_TYPES.M, Main);
        })
    }
}

function prepare_columns (Articles, hasMainColumn) {
    const FILLING_REQUIREMENTS = {
        "ASIDE_COLUMN": 3,
        "MAIN_COLUMN": hasMainColumn ? 9 : 0
    };
    const AsideColumn = [];
    const MainColumn = [];

    // Пока остаются нераспределённые новости,
    // И, пока не выполнятся условия по aside column
    // Или не выполнятся условия по main column, если hasMainColumn,
    // 
    // Сортировать новости по категориям

    for (let index = Articles.length - 1; index >= 0
        && (AsideColumn.length < FILLING_REQUIREMENTS.ASIDE_COLUMN
        || MainColumn.length < FILLING_REQUIREMENTS.MAIN_COLUMN); index--
    ) {
        const Article = Articles[index];

        if (Article.importance === CARD_TYPES.S && AsideColumn.length < FILLING_REQUIREMENTS.ASIDE_COLUMN) {
            AsideColumn.push(Article);
        } else if (hasMainColumn && MainColumn.length < FILLING_REQUIREMENTS.MAIN_COLUMN) {
            MainColumn.push(Article);
        }
    }

    return {
        "AsideColumn": AsideColumn, 
        "MainColumn": MainColumn
    };
}

function get_card_template (cardType) {
    switch(cardType) {
        case CARD_TYPES.S:
            return document.getElementById("article-card-s-template");
        case CARD_TYPES.M:
            return document.getElementById("article-card-m-template");
        case CARD_TYPES.L:
            return document.getElementById("article-card-l-template");
        default:
            console.error(`Был получен неизвестный тип карточки: ${cardType}`);
    }
}

function render_card(Article, cardType, destination) {
    const ArticleCardTemplate = get_card_template(cardType);
    const Card = ArticleCardTemplate.content.cloneNode(true);

    if (cardType === CARD_TYPES.M) {
        Card.querySelector("img").setAttribute("src", Article.coverImage.imagePath);
        Card.querySelector("img").setAttribute("alt", Article.coverImage.altText);
    }

    Card.querySelector("h3").textContent = Article.heading;
    Card.querySelector("time").setAttribute("datetime", Article.publicationDate);
    Card.querySelector("time").textContent = Article.publicationDate;
    Card.querySelector("a").setAttribute("href", `/article.html?id=${Article.id}`);

    destination.append(Card);
}
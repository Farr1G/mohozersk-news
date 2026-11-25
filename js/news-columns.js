const CARD_TYPES = {
        S: "s", M: "m", L: "l"
}

function renderColumns (columns, hasMainColumn) {
    columns.AsideColumn.forEach((article) => {
        const Aside = document.querySelector("aside");
        renderCard(article, CARD_TYPES.S, Aside);
    })

    if (hasMainColumn) {
        columns.MainColumn.forEach((article) => {
        const Main = document.querySelector("main")
            renderCard(article, CARD_TYPES.M, Main);
        })
    }
}

function prepareColumns (articles, hasMainColumn) {
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

    for (let index = articles.length - 1; index >= 0
        && (AsideColumn.length < FILLING_REQUIREMENTS.ASIDE_COLUMN
        || MainColumn.length < FILLING_REQUIREMENTS.MAIN_COLUMN); index--
    ) {
        const article = articles[index];

        if (article.importance === CARD_TYPES.S && AsideColumn.length < FILLING_REQUIREMENTS.ASIDE_COLUMN) {
            AsideColumn.push(article);
        } else if (hasMainColumn && MainColumn.length < FILLING_REQUIREMENTS.MAIN_COLUMN) {
            MainColumn.push(article);
        }
    }

    return {
        "AsideColumn": AsideColumn, 
        "MainColumn": MainColumn
    };
}

function getCardTemplate (cardType) {
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

function renderCard(article, cardType, destination) {
    if (article === undefined) {
        console.error(`Статья не была получена`);
        return;
    }

    const ArticleCardTemplate = getCardTemplate(cardType);
    const Card = ArticleCardTemplate.content.cloneNode(true);

    if (cardType === CARD_TYPES.M) {
        Card.querySelector("img").setAttribute("src", article.coverImage.path);
        Card.querySelector("img").setAttribute("alt", article.coverImage.altText);
    }

    Card.querySelector("h3").textContent = article.heading;
    Card.querySelector("time").setAttribute("datetime", article.publicationDate);
    Card.querySelector("time").textContent = formatAge(article.publicationDate);
    Card.querySelector("a").setAttribute("href", `/article.html?id=${article.id}`);
    Card.querySelector("a").setAttribute("id", `article-id-${article.id}`);

    destination.append(Card);

    if (cardType === CARD_TYPES.L) {
        destination.querySelector(".card_l").style.backgroundImage = `url('${article.coverImage.path}')`;
    }
}

function formatAge(publicationDate) {
    const temporalDate = Temporal.ZonedDateTime.from(`${publicationDate}+03:00[Europe/Moscow]`);
    const age = temporalDate.since(Temporal.Now.zonedDateTimeISO(), {largestUnit: "years", smallestUnits: "minutes"});
    
    if (Temporal.Duration.compare(Temporal.Duration.from({minutes: 5}), age) === -1) {
        return "только что";
    }
 
    // Relative Time Formatter
    const RTF = new Intl.RelativeTimeFormat("ru", {numeric: "auto"});
    const UNITS = ["years", "months", "days", "hours", "minutes"];

    for (const unit of UNITS) {
        if (age[unit] !== 0) {
            const roundedAge = age.round({largestUnit: unit, smallestUnit: unit});

            return RTF.format(roundedAge[unit], unit);
        }
    }
}

function formatDate(publicationDate) {
    const temporalDate = Temporal.ZonedDateTime.from(`${publicationDate}+03:00[Europe/Moscow]`);
    return temporalDate.toLocaleString("ru", {
        dateStyle: "long",
        timeStyle: "short"
    });
}
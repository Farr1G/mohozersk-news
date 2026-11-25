(async () => {
    const id = getIdFromURL();
    const article = await getArticle(id);

    if (article === undefined) {
        window.location.replace(`non-existing-page.html`);
        return;
    }

    const Main = document.querySelector("main");

    Main.querySelector("time").setAttribute("datetime", article.publicationDate);
    Main.querySelector("time").textContent = formatDate(article.publicationDate);
    Main.querySelector("h1").textContent = article.heading;
    renderTags(article.tags);

    renderElement(article.coverImage, Main);

    article.content.forEach((element) => {
        renderElement(element, Main);
    })

    renderLinkedArticles(article.linkedArticles);
    removeArticleFromAside(id);
})();

function getIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function renderTags(tags) {
    const TagContainer = document.querySelector(".article__tags");
    const TagTemplate = document.getElementById("article-tag-template");

    tags.forEach((tag) => {
        const TagInstance = TagTemplate.content.cloneNode(true);
        TagInstance.querySelector("a").textContent = tag;
        TagContainer.append(TagInstance);
    });
}

function renderElement(element, container) {
    switch (typeof(element)) {
        case "string":
            const ParagraphTemplate = document.getElementById("article-paragraph-template");
            const ParagraphInstance = ParagraphTemplate.content.cloneNode(true);

            ParagraphInstance.querySelector("p").textContent = element;

            container.append(ParagraphInstance);
            break;

        case "object":
            const ImageTemplate = document.getElementById("article-image-template");
            const ImageInstance = ImageTemplate.content.cloneNode(true);

            ImageInstance.querySelector("img").setAttribute("src", element.path);
            ImageInstance.querySelector("img").setAttribute("alt", element.altText);
            ImageInstance.querySelector("p").textContent = element.altText;

            container.append(ImageInstance);
            break;
    
        default:
            console.error(`Было получено неизвестное содержимое статьи: тип "${typeof(element)}"`, element);
            break;
    }
}

async function renderLinkedArticles (linkedArticles) {
    const LinkedArticlesContainer = document.querySelector(".linked-articles");

    if (linkedArticles === null) {
        LinkedArticlesContainer.remove();
        return;
    }

    for (let index = 0; index < linkedArticles.length; index++) {
        const linkedArticle = await getArticle(linkedArticles[index]);
        renderCard(linkedArticle, CARD_TYPES.S, LinkedArticlesContainer);
    }

    if (!LinkedArticlesContainer.hasChildNodes()) {
        LinkedArticlesContainer.remove();
    }
}

function removeArticleFromAside(id) {
    const articleCard = document.getElementById(`article-id-${id}`);

    if (articleCard !== null) {
        articleCard.remove();
    }
}
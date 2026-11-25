// TODO: Заменить на вытягивание из ссылки
// Сделать проверку на валидность статьи
// const ARTICE_INDEX = 0

// Получить статью по индексу
// Заполнить информацией страницу
// Получить связанные статьи
// Создать их карточки в конце страницы
// Удалить статью из боковой колонки, если она там есть
(get_article(get_id_from_url()))
    .then((article) => {
        if (article === undefined) {
            window.location.replace(`non-existing-page.html`);
            return;
        }

        const Main = document.querySelector("main");

        // Заголовок и сведения о статье

        Main.querySelector("time").setAttribute("datetime", article.publicationDate);
        Main.querySelector("time").textContent = formatDate(article.publicationDate);
        Main.querySelector("h1").textContent = article.heading;

        const TagContainer = Main.querySelector(".article__tags");
        const TagTemplate = document.getElementById("article-tag-template");

        article.tags.forEach((tag) => {
            const TagInstance = TagTemplate.content.cloneNode(true);
            TagInstance.querySelector("a").textContent = tag;
            TagContainer.append(TagInstance);
        });

        // Обложка

        render_element(article.coverImage, Main)

        // Содержание статьи

        article.content.forEach((element) => {
            render_element(element, Main);
        })

        render_linked_articles(article.linkedArticles);
    })

function get_id_from_url() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function render_element(element, container) {
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

async function render_linked_articles (linkedArticles) {
    const LinkedArticlesContainer = document.querySelector(".linked-articles");

    if (linkedArticles === null) {
        LinkedArticlesContainer.remove();
        return;
    }

    for (let index = 0; index < linkedArticles.length; index++) {
        const linkedArticle = await get_article(linkedArticles[index]);
        renderCard(linkedArticle, CARD_TYPES.S, LinkedArticlesContainer);
    }

    if (!linkedArticles.hasChildNodes()) {
        LinkedArticlesContainer.remove();
    }
}
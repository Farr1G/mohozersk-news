// TODO: Заменить на вытягивание из ссылки
// Сделать проверку на валидность статьи
// const ARTICE_INDEX = 0

// Получить статью по индексу
// Заполнить информацией страницу
// Получить связанные статьи
// Создать их карточки в конце страницы
// Удалить статью из боковой колонки, если она там есть
(get_id_from_url())
    .then((id) => get_article(id))
    .then((Article) => {
        const Main = document.querySelector("main");

        // Заголовок и сведения о статье

        Main.querySelector("time").setAttribute("datetime", Article.publicationDate);
        Main.querySelector("time").textContent = Article.publicationDate;
        Main.querySelector("h1").textContent = Article.heading;

        const TagContainer = Main.querySelector(".article__tags");
        const TagTemplate = document.getElementById("article-tag-template");

        Article.tags.forEach((tag) => {
            const TagInstance = TagTemplate.content.cloneNode(true);
            TagInstance.querySelector("a").textContent = tag;
            TagContainer.append(TagInstance);
        });

        // Обложка

        render_element(Article.coverImage, Main)

        // Содержание статьи

        Article.content.forEach((element) => {
            render_element(element, Main);
        })

        render_linked_articles(Article.linkedArticles);
    })

// Функция асинхронная, потому что это исправило её незапуск
// Нужно разобраться почему так происходит
async function get_id_from_url() {
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

            ImageInstance.querySelector("img").setAttribute("src", element.imagePath);
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

    for (let index = 0; index < linkedArticles.length; index++) {
        const linkedArticle = await get_article(linkedArticles[index]);
        render_card(linkedArticle, CARD_TYPES.S, LinkedArticlesContainer);
    }
}
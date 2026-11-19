// TODO: Заменить на вытягивание из ссылки
// Сделать проверку на валидность статьи
// const ARTICE_INDEX = 0

// Получить статью по индексу
// Заполнить информацией страницу
// Получить связанные статьи
// Создать их карточки в конце страницы
// Удалить статью из боковой колонки, если она там есть
(get_article(0))
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

        const ImageTemplate = document.getElementById("article-image-template");

        const CoverImage = ImageTemplate.content.cloneNode(true);
        CoverImage.querySelector("img").setAttribute("src", Article.coverImage);
        CoverImage.querySelector("img").setAttribute("alt", Article.altText);
        CoverImage.querySelector("p").textContent = Article.altText;

        Main.append(CoverImage);

        // Содержание статьи

        const ParagraphTemplate = document.getElementById("article-paragraph-template");

        Article.content.forEach((contentElement) => {
            switch (typeof(contentElement)) {
                case "string":
                    const ParagraphInstance = ParagraphTemplate.content.cloneNode(true);
                    ParagraphInstance.querySelector("p").textContent = contentElement;
                    Main.append(ParagraphInstance);
                    break;

                case "object":
                    const ImageInstance = ImageTemplate.content.cloneNode(true);
                    ImageInstance.querySelector("img").setAttribute("src", contentElement.imagePath);
                    ImageInstance.querySelector("img").setAttribute("alt", contentElement.altText);
                    ImageInstance.querySelector("p").textContent = contentElement.altText;
                    Main.append(ImageInstance);
                    break;
            
                default:
                    console.error(`Было получено неизвестное содержимое статьи: тип "${typeof(contentElement)}"`, contentElement);
                    break;
            }
        })

        render_linked_articles(Article.linkedArticles);
    })

async function render_linked_articles (linkedArticles) {
    const LinkedArticlesContainer = document.querySelector(".linked-articles");

    for (let index = 0; index < linkedArticles.length; index++) {
        const linkedArticle = await get_article(linkedArticles[index]);
        render_card(linkedArticle, CARD_TYPES.S, LinkedArticlesContainer);
    }
}
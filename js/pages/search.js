// https://doka.guide/js/deal-with-forms/

const SearchForm = document.getElementById("search-form");
SearchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const data = new FormData (SearchForm);
    const filters = parseFormData(data);
    const articles = await getArticlesByFilters(filters);

    const SearchResultsSection = document.querySelector(".search-results");
    
    while (SearchResultsSection.lastElementChild) {
        SearchResultsSection.removeChild(SearchResultsSection.lastElementChild);
    }

    articles.forEach((article) => {
        renderCard(article, CARD_TYPES.S, SearchResultsSection);
    });
});

function parseFormData(data) {
    return {
        "fromDate": data.get("from-date-input") ? Temporal.PlainDate.from(data.get("from-date-input")) : null,
        "untilDate": data.get("until-date-input") ? Temporal.PlainDate.from(data.get("until-date-input")) : null,
        "keywords": data.get("searchbar-input"),
        "theme": data.get("theme-input")
    };
}
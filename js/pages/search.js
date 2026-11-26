// https://doka.guide/js/deal-with-forms/

const SearchForm = document.getElementById("search-form");

SearchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const data = new FormData (SearchForm);
    const filters = parseFormData(data);
    const articles = await getArticlesByFilters(filters);
    
    insertFiltersIntoURL(filters)
    showSearchResults(articles);
});

async function applyFiltersFromURL() {
    const filters = getFiltersFromURL();
    fillFormFromFilters(filters);
}

function parseFormData(data) {
    return {
        "fromDate": data.get("from-date-input") ? Temporal.PlainDate.from(data.get("from-date-input")) : null,
        "untilDate": data.get("until-date-input") ? Temporal.PlainDate.from(data.get("until-date-input")) : null,
        "keywords": data.get("searchbar-input") !== "" ? data.get("searchbar-input") : null,
        "theme": data.get("theme-input") !== "По всем темам" ? data.get("theme-input") : null
    };
}

function insertFiltersIntoURL(filters) {
    const params = new URLSearchParams();

    if (filters.fromDate) {
        params.set("from", filters.fromDate.toString());
    }

    if (filters.untilDate) {
        params.set("until", filters.untilDate.toString());
    }

    if (filters.keywords) {
        params.set("keywords", filters.keywords)
    }

    if (filters.theme) {
        params.set("theme", filters.theme)
    }
    
    history.pushState(null, "", window.location.pathname + "?" + params.toString());
}

function getFiltersFromURL() {
    const params = new URLSearchParams(window.location.search);

    return {
        "fromDate" : params.has("from") ? Temporal.PlainDate.from(params.get("from")) : null,
        "untilDate" : params.has("until") ? Temporal.PlainDate.from(params.get("until")) : null,
        "keywords": params.has("keywords") ? params.get("keywords") : null,
        "theme": params.has("theme") ? params.get("theme") : null
    }
}

function showSearchResults(articles) {
    const SearchResultsSection = document.querySelector(".search-results");
    
    while (SearchResultsSection.lastElementChild) {
        SearchResultsSection.removeChild(SearchResultsSection.lastElementChild);
    }

    articles.forEach((article) => {
        renderCard(article, CARD_TYPES.S, SearchResultsSection);
    });
}

function fillFormFromFilters(filters) { 
    document.getElementById("from-date-input").value = filters.fromDate ? filters.fromDate.toString() : "";
    document.getElementById("until-date-input").value = filters.untilDate ? filters.untilDate.toString() : "";
    document.getElementById("searchbar-input").value = filters.keywords ? filters.keywords : "";
    document.getElementById("theme-input").value = filters.theme ? filters.theme : "По всем темам";
}

// Вставка тем
(async () => {
    const themes = await getThemes();

    const ThemeInput = document.getElementById("theme-input");
    const ThemeOptionTemplate = document.getElementById("option-template");

    themes.forEach((theme) => {
        const Option = ThemeOptionTemplate.content.cloneNode(true);

        Option.querySelector("option").setAttribute("value", theme);
        Option.querySelector("option").textContent = theme;

        ThemeInput.append(Option);
    })

    applyFiltersFromURL();
})();
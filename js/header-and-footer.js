(async () => {
    // Добавление шапки на страницу

    const response = await fetch("/header.html");
    const html = await response.text()

    document.getElementById("header-placeholder").innerHTML = html;

    // Подключение поиска

    const SearchbarInput = document.getElementById("header-searchbar-input");
    const SearchbarButton = document.getElementById("header-searchbar-button");

    SearchbarButton.addEventListener("click", () => {
        const SearchURL = SearchbarInput.value !== "" ? `/search.html?keywords=${SearchbarInput.value}` : `/search.html`;

        window.location.assign(SearchURL);
    })
})();

(async () => {
    // Добавление подвала на страницу

    const response = await fetch("/footer.html");
    const html = await response.text()

    document.getElementById("footer-placeholder").innerHTML = html;
})();
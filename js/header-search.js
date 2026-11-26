const SearchbarInput = document.getElementById("header-searchbar-input");
const SearchbarButton = document.getElementById("header-searchbar-button");

SearchbarButton.addEventListener("click", () => {
    const SearchURL = `/search.html?keywords=${SearchbarInput.value}`;

    window.location.assign(SearchURL);
})
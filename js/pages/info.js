const links = document.querySelectorAll(".aside__link");

window.addEventListener("hashchange", changeSelectedLink);
changeSelectedLink();

function changeSelectedLink() {
    links.forEach(item => item.classList.remove('aside__link_target'));
    const selectedSection = window.location.hash;
    document.querySelector(`${selectedSection}-link`).classList.add("aside__link_target");
}

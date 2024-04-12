const popup_search = document.querySelector("#popup_search");
const show_popup_search = document.querySelector("#show_popup_search");
const popup_search_inner_container = popup_search.querySelector(".inner_container");

show_popup_search.addEventListener("click", () => {
    popup_search.classList.add("active");
});

popup_search.addEventListener("click", () => {
    popup_search.classList.remove("active");
});

popup_search_inner_container.addEventListener("click", (event) =>{
    event.stopPropagation();
})
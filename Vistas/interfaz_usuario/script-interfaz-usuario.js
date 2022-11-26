const btnsCrud = document.querySelector(".btns-crud");
const navToggle = document.querySelector(".desplegar");
const btn_1 = document.querySelector(".btn-1");
const btn_2 = document.querySelector(".btn-2");
const btn_exit = document.querySelector(".sign-off");

navToggle.addEventListener("click", (e) => {
    const visibility = btnsCrud.getAttribute("data-visible");
    
    if (visibility === "false") {
        btnsCrud.setAttribute("data-visible", true);
        navToggle.setAttribute("aria-expanded", true);
    } else if (visibility === "true") {
        btnsCrud.setAttribute("data-visible", false);
        navToggle.setAttribute("aria-expanded", false);
    }
});

btn_1.addEventListener("click", (e) => {
    const visibility = btnsCrud.getAttribute("data-visible");

    if (visibility === "true") {
        btnsCrud.setAttribute("data-visible", false);
        navToggle.setAttribute("aria-expanded", false);
    }
});

btn_2.addEventListener("click", (e) => {
    const visibility = btnsCrud.getAttribute("data-visible");

    if (visibility === "true") {
        btnsCrud.setAttribute("data-visible", false);
        navToggle.setAttribute("aria-expanded", false);
    }
});

btn_exit.addEventListener("click", (e) => {
    confirm("¿Estas seguro de salir del sistemas?");
});
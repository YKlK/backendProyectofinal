const btnsCrud = document.querySelector(".btns-crud");
const navToggle = document.querySelector(".desplegar");
const btn_1 = document.querySelector(".btn-1");
const btn_2 = document.querySelector(".btn-2");
const btn_3 = document.querySelector(".btn-3");
const btn_4 = document.querySelector(".btn-4");

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

btn_3.addEventListener("click", (e) => {
    const visibility = btnsCrud.getAttribute("data-visible");

    if (visibility === "true") {
        btnsCrud.setAttribute("data-visible", false);
        navToggle.setAttribute("aria-expanded", false);
    }
});

btn_4.addEventListener("click", (e) => {
    const visibility = btnsCrud.getAttribute("data-visible");

    if (visibility === "true") {
        btnsCrud.setAttribute("data-visible", false);
        navToggle.setAttribute("aria-expanded", false);
    }
});
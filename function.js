import { toggleBarMain } from "./decoration.js";
import { renderCloneHomePage, renderHomePage, renderVideoPage } from "./render.js";

let page = document.querySelector(".page")
renderCloneHomePage()
renderHomePage()
let symbol = document.querySelector(".symbol")
symbol.addEventListener("click", async () => {
    renderCloneHomePage()
    renderHomePage()

})
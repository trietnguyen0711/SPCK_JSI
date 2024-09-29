const scrollbarDivs = document.querySelectorAll('.leftScroll');
const leftScroll = document.querySelector(".leftScroll")
scrollbarDivs.forEach(scrollbarDiv => {
    scrollbarDiv.addEventListener("mouseenter", () => {
        scrollbarDiv.classList.add("hovered")
    })
    scrollbarDiv.addEventListener("mouseleave", () => {
        scrollbarDiv.classList.remove("hovered")
    })
})
// Toggle :: Không biết có cách nào rút ngắn không chứ công nhận dài vãi
// Vì cái vụ trạng thái khi load lại trang web nên ko sài toggle đc 
function toggleBarMain() {
    const barDiv = document.querySelector(".fa-bars")
    if (localStorage.getItem("statusBar")) {
        let statusBar = JSON.parse(localStorage.getItem("statusBar"));
        ToggleBar(!statusBar);
        // Lý do phải phủ định là do khi reset nó ở trạng thái false thì cần thực thi "remove" nhưng ToggleBar chỉ thực thi hàm "remove" khi trạng thái là true (Vì hàm ToggleBar dùng để chuyển đổi trạng thái không phải in trạng thái) 
    } else {
        let statusBar = true;
        ToggleBar(!statusBar);
        // Lý do phải phủ định là do khi reset nó ở trạng thái false thì cần thực thi "remove" nhưng ToggleBar chỉ thực thi hàm "remove" khi trạng thái là true  (Vì hàm ToggleBar dùng để chuyển đổi trạng thái không phải in trạng thái) 
    }
    barDiv.addEventListener("click", () => {
        let statusBar;
        if (localStorage.getItem("statusBar")) {
            statusBar = JSON.parse(localStorage.getItem("statusBar"));
        } else {
            statusBar = true;
        }

        ToggleBar(statusBar);

    });
    function ToggleBar(statusBar) {
        const leftScroll = document.querySelector(".leftScroll")
        const hiddenBarBlock = document.querySelectorAll(".hiddenBarBlock")
        const firstSection = document.querySelectorAll(".firstSection")
        const hiddenDiv = document.querySelector(".hiddenDiv")
        const main = document.querySelectorAll(".main")
        const token = document.querySelectorAll(".token")
        const content = document.querySelector(".content")
        if (statusBar) {
            leftScroll.classList.remove("xl:w-[240px]");
            leftScroll.classList.remove("xl:px-3");
            content.classList.remove("xl:ps-[240px]");
            hiddenDiv.classList.remove("xl:hidden");

            for (let i = 0; i < firstSection.length; i++) {
                firstSection[i].classList.remove("xl:flex");
            }
            for (let i = 0; i < main.length; i++) {
                main[i].classList.remove("xl:mt-0");
                main[i].classList.remove("xl:text-[16px]");
            }
            for (let i = 0; i < token.length; i++) {
                token[i].classList.remove("xl:me-[30px]");
            }
            for (let i = 0; i < hiddenBarBlock.length; i++) {
                hiddenBarBlock[i].classList.remove("xl:block");
            }

            localStorage.setItem("statusBar", false);
        } else {
            leftScroll.classList.add("xl:w-[240px]");
            leftScroll.classList.add("xl:px-3");
            content.classList.add("xl:ps-[240px]");
            hiddenDiv.classList.add("xl:hidden");

            for (let i = 0; i < firstSection.length; i++) {
                firstSection[i].classList.add("xl:flex");
            }
            for (let i = 0; i < main.length; i++) {
                main[i].classList.add("xl:mt-0");
                main[i].classList.add("xl:text-[16px]");
            }
            for (let i = 0; i < token.length; i++) {
                token[i].classList.add("xl:me-[30px]");
            }
            for (let i = 0; i < hiddenBarBlock.length; i++) {
                hiddenBarBlock[i].classList.add("xl:block");
            }

            localStorage.setItem("statusBar", true);
        }
    }
}
toggleBarMain()
// Toggle của avatar
let avatarHome = document.querySelector(".avatarHome")
let infoBox = document.querySelector(".infoBox")
avatarHome.addEventListener("click", () => {
    infoBox.classList.toggle("hidden")
})
export { toggleBarMain }
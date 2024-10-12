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
function toggleBarMain(ToggleBar) {
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

        ToggleBar(statusBar, 1);
    });
}
toggleBarMain(ToggleBar)
function ToggleBar(statusBar, check) {
    if (document.querySelector(".leftScroll")) {
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
    else {
        let appearDiv = document.querySelector(".appearDiv")
        appearDiv.innerHTML = `
            <div class=" fixed inset-0 bg-black opacity-70 z-50 pointer-events-auto">
            <div class="bg-black flex-between px-3 h-[56px] w-[100%] fixed bg-black " style="z-index: 1;">
                <div class="flex-between w-[140px]  text-white ">
                    <i class="fa-solid fa-bars h-[24px] w-[24px] rounded-full p-5 hover:bg-[#222222]" onclick="
    const appearDiv = document.querySelector('.appearDiv');
        appearDiv.innerHTML = ''; // Xóa nội dung
"></i>
                    <div class="flex-around h-[40px] w-[90px] symbol cursor-pointer">
                        <i class="fa-brands fa-youtube h-[40px] w-[40px] text-red-500 text-[27px] me-1"></i>
                        <h3 class="font-semibold ">Youtube</h3>
                    </div>
                </div>

            </div>
            <div
                class="leftScroll bg-black xl:px-3 px-1 fixed mt-[56px] h-[calc(100vh-56px)] overflow-y-auto pb-5 xl:w-[240px] w-[90px] lg:block hidden fixed" style="z-index: 1;">
                <a href="index.html"
                    class="firstSection text-white items-center w-[100%] overflow-hidden cursor-pointer px-3 py-1  hover:bg-[#222222] rounded-full xl:flex block xl:mt-3 mt-[30px]">
                    <i class="token fa-solid fa-house xl:me-[30px]"></i>
                    <h5 class="main xl:text-[16px] text-[10px] text-center xl:mt-0 mt-3 lg:w-auto w-full block">Trang
                        chủ</h5>
                </a>
                <div
                    class="firstSection text-white items-center w-[100%] overflow-hidden cursor-pointer px-3 py-1  hover:bg-[#222222] rounded-full xl:flex block xl:mt-3 mt-[30px]">
                    <i class="token fa-solid fa-film xl:me-[30px]"></i>
                    <h5 class="main xl:text-[16px] text-[10px] text-center xl:mt-0 mt-3">Shorts</h5>
                </div>
                <div
                    class="firstSection text-white items-center w-[100%] overflow-hidden cursor-pointer px-3 py-1  hover:bg-[#222222] rounded-full xl:flex block xl:mt-3 mt-[30px]">
                    <i class="token fa-solid fa-layer-group xl:me-[30px]"></i>
                    <h5 class="main xl:text-[16px] text-[10px] text-center xl:mt-0 mt-3">Kênh đăng ký</h5>
                </div>
                <div
                    class="hiddenDiv text-white items-center w-[100%] overflow-hidden cursor-pointer px-3 py-1  hover:bg-[#222222] rounded-full xl:hidden block mt-[30px]">
                    <i class="fa-solid fa-tv"></i>
                    <h5 class="main xl:text-[16px] text-[10px] text-center xl:mt-0 mt-3">Bạn</h5>
                </div>

                <div class="hiddenBarBlock border-t-[1px] mt-4 border-[#3f3f3f] xl:block hidden">
                    <div
                        class="text-white rounded-full flex items-center w-[100%] mt-3 overflow-hidden text-[18px] cursor-pointer px-3 hover:bg-[#222222]">
                        <h5>Bạn</h5>
                        <h5 class="ms-[20px]">></h5>
                    </div>
                    <div
                        class="text-white flex items-center w-[100%] mt-3 overflow-hidden cursor-pointer px-3 py-1  hover:bg-[#222222] rounded-full  ">
                        <i class="fa-solid fa-id-card-clip me-[30px]"></i>
                        <h5 class="">Kênh của bạn</h5>
                    </div>
                    <div
                        class="text-white flex items-center w-[100%] mt-3 overflow-hidden cursor-pointer px-3 py-1  hover:bg-[#222222] rounded-full  ">
                        <i class="fa-solid fa-clock-rotate-left me-[30px]"></i>
                        <h5 class="">Video đã xem</h5>
                    </div>
                    <div
                        class="text-white flex items-center w-[100%] mt-3 overflow-hidden cursor-pointer px-3 py-1  hover:bg-[#222222] rounded-full  ">
                        <i class="fa-solid fa-list me-[30px]"></i>
                        <h5 class="">Danh sách phát</h5>
                    </div>
                    <div
                        class="text-white flex items-center w-[100%] mt-3 overflow-hidden cursor-pointer px-3 py-1  hover:bg-[#222222] rounded-full  ">
                        <i class="fa-solid fa-circle-play me-[30px]"></i>
                        <h5 class="">Video của bạn</h5>
                    </div>
                    <div
                        class="text-white flex items-center w-[100%] mt-3 overflow-hidden cursor-pointer px-3 py-1  hover:bg-[#222222] rounded-full  ">
                        <i class="fa-regular fa-clock me-[30px]"></i>
                        <h5 class="">Xem sau</h5>
                    </div>
                    <div
                        class="text-white flex items-center w-[100%] mt-3 overflow-hidden cursor-pointer px-3 py-1  hover:bg-[#222222] rounded-full  ">
                        <i class="fa-regular fa-thumbs-up me-[30px]"></i>
                        <h5 class="">Video đã thích</h5>
                    </div>
                </div>
            </div>
        </div>
            `
    }
}

// Toggle của avatar
function avatar() {
    if (document.querySelector(".avatarHome")) {
        let avatarHome = document.querySelector(".avatarHome")
        let infoBox = document.querySelector(".infoBox")
        avatarHome.addEventListener("click", () => {
            infoBox.classList.toggle("hidden")
        })
    }
}
export { toggleBarMain, avatar }
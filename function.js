import { signIn } from "./auth.js";
import { avatar, toggleBarMain } from "./decoration.js";
import { renderCloneHomePage, renderHomePage, renderLogPage, renderVideoPage } from "./render.js";

let page = document.querySelector(".page")
renderCloneHomePage()
renderHomePage()
function avatarMainPage() {
    let symbol = document.querySelectorAll(".symbol")
    for (let i = 0; i < symbol.length; i++) {
        symbol[i].addEventListener("click", async () => {
            renderCloneHomePage()
            renderHomePage()

        })
    }
}
avatarMainPage()
// Sign in and up in main page
function signInUpMainPage() {
    let accountBox = document.querySelector(".accountBox")
    if (localStorage.getItem("username")) {
        let user = localStorage.getItem("username")
        let html = `
    <div class="rounded-full h-[40px] w-[40px] flex-center lg:bg-[#272727] hover:bg-[#272727]">
                    <i class="fa-solid fa-video "></i>
                </div>
                <div class="rounded-full h-[40px] w-[40px] flex-center lg:bg-[#272727] hover:bg-[#272727] mx-5">
                    <i class="fa-regular fa-bell"></i>
                </div>
                <div class="rounded-full h-[32px] w-[32px] bg-white overflow-hidden ">
                    <img src="" alt="" class="avatarHome object-cover object-center w-full h-full">
                </div>
                <div class="infoBox absolute bg-[#272727] w-[300px]  top-[3px] left-[-145px] rounded-lg hidden">
                    <div class="w-full py-5 flex items-center border-b-[1px] border-[#3f3f3f]">
                        <div class="rounded-full h-[50px] w-[50px] bg-white overflow-hidden ms-5">
                            <img src="" alt="" class="avatarHome object-cover object-center w-full h-full">
                        </div>
                        <div class="ms-5">
                            <p>${user.split('@')[0]}</p>
                            <p>${user}</p>
                            <p style="color: aqua;" class="cursor-pointer">Xem kênh của bạn</p>
                        </div>
                    </div>
                    <div class="p-4 border-b-[1px] border-[#3f3f3f]">
                        <div class="w-full flex items-center cursor-pointer hover:bg-[#3e3e3e] p-3 ">
                            <i class="fa-brands fa-google me-4"></i>
                            <p class="">Tài khoản Google</p>
                        </div>
                        <div class="w-full flex items-center cursor-pointer logOutBtn hover:bg-[#3e3e3e] p-3 ">
                            <i class="fa-solid fa-arrow-right-from-bracket me-4"></i>
                            <p class="">Đăng xuất</p>
                        </div>
                    </div>
                    <div class="p-4 border-b-[1px] border-[#3f3f3f]">
                        <div class="w-full flex items-center cursor-pointer hover:bg-[#3e3e3e] p-3 ">
                            <i class="fa-solid fa-circle-info me-4"></i>
                            <p class="">Thông tin tài khoản</p>
                        </div>
                        <div class="w-full flex items-center cursor-pointer hover:bg-[#3e3e3e] p-3">
                            <i class="fa-regular fa-lightbulb me-4"></i>
                            <p class="">Sáng tối</p>
                        </div>
                        <div class="w-full flex items-center cursor-pointer hover:bg-[#3e3e3e] p-3 ">
                            <i class="fa-solid fa-gear me-4"></i>
                            <p class="">Cài đặt</p>
                        </div>
                    </div>
                </div>
        `
        accountBox.innerHTML = html
        avatar()
        logOutMainPage()
    }
    else {
        accountBox.innerHTML = `
         <div
                    class="rounded-full h-[32px] w-[150px] flex-center bg-black border-2 border-slate-600 mx-5 hover:bg-[#272727] cur-pointer btnInfor">
                    <div class="rounded-full h-full py-[5px] text-[20px]">
                        <i class="fa-regular fa-circle-user"></i>
                    </div>
                    <div class="w-[15px]"></div>
                    <p class="" font-semibold>Đăng nhập</p>
                </div>
        `
        let btnInfor = document.querySelector(".btnInfor").addEventListener("click", () => {
            renderLogPage()
        })
    }
}
signInUpMainPage()
// Log Out in main page
function logOutMainPage() {
    let logOutBtn = document.querySelector(".logOutBtn")
    logOutBtn.addEventListener("click", () => {
        localStorage.removeItem('username');
        renderLogPage()
        let infoBox = document.querySelector(".infoBox")
        infoBox.classList.toggle("hidden")
    })
}
logOutMainPage()
export { avatarMainPage }
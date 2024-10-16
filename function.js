import { getChannels, signIn } from "./auth.js";
import { avatar, toggleBarMain } from "./decoration.js";
import { renderCloneVideoPage, renderCloneHomePage, renderHomePage, renderLogPage, renderVideoPage } from "./render.js";
function avatarMainPage() {
    let symbol = document.querySelectorAll(".symbol")
    for (let i = 0; i < symbol.length; i++) {
        symbol[i].addEventListener("click", async () => {
            renderCloneHomePage()
            renderHomePage()

        })
    }
}
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
                        <div class="w-full flex items-center cursor-pointer hover:bg-[#3e3e3e] p-3 submitAccount">
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
// Log Out in main page
function logOutMainPage() {
    if (document.querySelector(".logOutBtn")) {
        let logOutBtn = document.querySelector(".logOutBtn")
        logOutBtn.addEventListener("click", () => {
            localStorage.removeItem('username');
            renderLogPage()
            let infoBox = document.querySelector(".infoBox")
            infoBox.classList.toggle("hidden")
        })
    }
}
// Searching function
async function searchVideos() {
    let listChannels = await getChannels(); // Lấy danh sách kênh
    let searchInput = document.querySelector(".searchInput"); // Input người dùng nhập từ khóa
    let searchingSubmit = document.querySelectorAll(".searchingSubmit"); // Nút submit tìm kiếm

    for (let i = 0; i < searchingSubmit.length; i++) {
        searchingSubmit[i].addEventListener("click", () => {
            const keyFinding = searchInput.value.toLowerCase(); // Chuyển từ khóa thành chữ thường
            let resultListChannel = [];  // Tạo mảng để chứa kênh và video phù hợp

            // Lặp qua tất cả các kênh và tìm video khớp từ khóa
            for (let j = 0; j < listChannels.length; j++) {
                let channel = listChannels[j];
                let videos = channel.videos;
                let filteredVideos = videos.filter(video =>
                    video.name.toLowerCase().includes(keyFinding)
                );

                // Nếu có video khớp, thêm kênh và video vào resultListChannel
                if (filteredVideos.length > 0) {
                    resultListChannel.push({
                        name: channel.name,
                        videos: filteredVideos,
                        description: channel.description,
                        avatar: channel.avatar,
                    });
                }
            }
            console.log(resultListChannel)
            if (resultListChannel.length <= 0) {
                alert("Can not find suitable videos")
                renderCloneHomePage()
                renderHomePage()
            }
            else {
                let page = document.querySelector(".page")
                let html = `<div class="h-[70px]"></div>`
                for (let k = 0; k < resultListChannel.length; k++) {
                    for (let i = 0; i < resultListChannel[k].videos.length; i++) {
                        html += `
                <div class="w-[80%] mt-3 cursor-pointer mx-auto videoItem" data-channelId="${k}" data-videoId="${resultListChannel[k].videos[i].id}">
                    <div class="h-[300px] block lg:flex w-full rounded-lg overflow-hidden">
                        <div class="lg:h-full relative overflow-hidden">
                            <img src="${resultListChannel[k].videos[i].img}" alt="YouTube Thumbnail""
                                class="bg-white object-cover object-center w-full h-full" alt="">
                            <div class="bg-[#616161]  bg-transparent text-white absolute right-[10px] bottom-[10px]">
                                <p>2:31</p>
                            </div>
                            <div class="h-[4px] w-[0%] bg-red-600 absolute bottom-0"></div>
                        </div>
                        <div class="lg:h-full h-[30%] lg:w-[50%] w-full py-3 ms-5 flex">
                            <div class="rounded-full h-[30px] w-[30px] bg-white me-[15px] overflow-hidden">
                                <img src="${resultListChannel[k].avatar}" alt="YouTube Thumbnail" class="object-cover object-center w-full h-full rounded-full">
                            </div>
                            <div class=" w-[250px] text-white">
                                <p class="line-clamp-2">
                                ${resultListChannel[k].videos[i].name}
                                </p>
                                <p class="w-[100%]">${resultListChannel[k].name}</p>
                                <div class="flex w-[90%]">
                                    <p>${resultListChannel[k].videos[i].watcher} N người</p>
                                    <p class="mx-3">-</p>
                                    <p>${resultListChannel[k].videos[i].date} trước</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `
                    }
                }
                page.innerHTML = html
                document.querySelectorAll('.videoItem').forEach(item => {
                    item.addEventListener('click', (event) => {
                        renderCloneVideoPage();
                        renderVideoPage(item.getAttribute("data-channelId"), item.getAttribute("data-videoId"));
                    });
                });
            }
        });
    }
}


export { avatarMainPage, signInUpMainPage, logOutMainPage, searchVideos }
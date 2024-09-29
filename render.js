import { getChannels } from "./auth.js"
import { toggleBarMain } from "./decoration.js"
let page = document.querySelector(".page")
async function renderCloneVideoPage() {
    page.innerHTML = `
    <div class="content bg-black flex pt-[70px]" style="justify-content: space-around;">
            <div class="">
                <div class="w-[946px] h-[530px] rounded-lg overflow-hidden bg-[#222222]">
                    
                </div>
            </div>
            <div class="w-[426px] h-full filmsChoice">
                <!-- <div class="flex-around h-full mt-5">
                     <div class="w-[168px] h-[94px] rounded-lg overflow-hidden">
                         <img src="https://i.ytimg.com/vi/Z2a8lUYe8x8/maxresdefault.jpg"
                             class="bg-white object-cover object-center w-full h-full" alt="YouTube Thumbnail">
                     </div>
                     <div class="text-white">
                         <p>Mushoku Tensei ss1</p>
                         <p class="text-[#9e9e9e]">Muse Asia</p>
                         <div class="flex">
                             <p class="text-[#9e9e9e] me-5">100 N nguời xem </p>
                             <p class="text-[#9e9e9e]">9 ngay </p>
                         </div>
                     </div>
                 </div> -->
            </div>
        </div>
    `
    // RenderListChoice
    let filmsChoice = document.querySelector(".filmsChoice")
    let html = ""
    for (let k = 0; k < 10; k++) {
        html += `
        <div class="flex-around h-full mt-5">
            <div class="w-[168px] h-[94px] rounded-lg overflow-hidden bg-[#222222]">
            </div>
            <div class="text-white ">
                <p class="w-[195px] line-clamp-2 bg-[#222222] w-[50px] h-[20px]"></p>
                <p class="text-[#9e9e9e] bg-[#222222] bg-[#222222] my-5 w-[50px] h-[20px]"></p>
                <p class="text-[#9e9e9e] bg-[#222222] bg-[#222222] w-[120px] h-[20px]"></p>
            </div>
        </div>
    `
    }
    filmsChoice.innerHTML = html
}
async function renderVideoPage(idChannel, idVideo) {
    let listChannels = await getChannels()
    page.innerHTML = `
    <div class="content bg-black flex pt-[70px]" style="justify-content: space-around;">
            <div class="">
                <div class="w-[946px] h-[530px] rounded-lg overflow-hidden">
                    <img src="${listChannels[idChannel].videos[idVideo].img}"
                        class="bg-white object-cover object-center w-full h-full" alt="YouTube Thumbnail">
                </div>
                <h1 class="my-2 text-white text-[20px] font-semibold">${listChannels[idChannel].videos[idVideo].name}</h1>
                <div class="flex items-center">
                    <div class="h-[40px] w-[40px] rounded-full overflow-hidden me-3">
                        <img src="" alt="YouTube Thumbnail">
                    </div>
                    <div class="me-5">
                        <h4 class="text-white">${listChannels[idChannel].name}</h4>
                        <p class="text-[#9e9e9e]">${listChannels[idChannel].videos[idVideo].watcher} N người</p>
                    </div>
                    <button class="rounded-full bg-white p-3 me-5">Tham gia</button>
                    <button class="rounded-full bg-[#323332] text-white p-3 flex-around">
                        <i class="fa-regular fa-bell"></i>
                        <p class="mx-4">Đã đăng ký</p>
                        <i class="fa-solid fa-chevron-down"></i>
                    </button>
                </div>
            </div>
            <div class="w-[426px] h-full filmsChoice">
                <!-- <div class="flex-around h-full mt-5">
                     <div class="w-[168px] h-[94px] rounded-lg overflow-hidden">
                         <img src="https://i.ytimg.com/vi/Z2a8lUYe8x8/maxresdefault.jpg"
                             class="bg-white object-cover object-center w-full h-full" alt="YouTube Thumbnail">
                     </div>
                     <div class="text-white">
                         <p>Mushoku Tensei ss1</p>
                         <p class="text-[#9e9e9e]">Muse Asia</p>
                         <div class="flex">
                             <p class="text-[#9e9e9e] me-5">100 N nguời xem </p>
                             <p class="text-[#9e9e9e]">9 ngay </p>
                         </div>
                     </div>
                 </div> -->
            </div>
        </div>
    `
    // Render video
    let filmsChoice = document.querySelector(".filmsChoice")
    let html = ""
    // RenderListChoice
    for (let k = 0; k < listChannels.length; k++) {
        for (let i = 0; i < listChannels[k].videos.length; i++) {
            if (idChannel == k && idVideo == i) {
                continue;
            }
            html += `
        <div class="flex-around h-full mt-5 cursor-pointer videoItem" data-channelId="${k}" data-videoId="${i}">
            <div class="w-[168px] h-[94px] rounded-lg overflow-hidden">
                <img src="${listChannels[k].videos[i].img}"
                    class="bg-white object-cover object-center w-full h-full" alt="YouTube Thumbnail">
            </div>
            <div class="text-white">
                <p class="w-[195px] line-clamp-2">${listChannels[k].videos[i].name}</p>
                <p class="text-[#9e9e9e]">${listChannels[k].name}</p>
                <div class="flex">
                    <p class="text-[#9e9e9e] me-5">${listChannels[k].videos[i].watcher} N người</p>
                    <p class="text-[#9e9e9e]">${listChannels[k].videos[i].date} trước </p>
                </div>
            </div>
        </div>
    `
        }
    }
    filmsChoice.innerHTML = html
    document.querySelectorAll('.videoItem').forEach(item => {
        item.addEventListener('click', (event) => {
            renderCloneVideoPage();
            renderVideoPage(item.getAttribute("data-channelId"), item.getAttribute("data-videoId"));
        });
    });
}
async function renderCloneHomePage() {
    page.innerHTML = `
        <!-- Content -->
        <div
            class="content bg-black px-3 pt-[70px] h-[100vh] grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4 overflow-auto listFilm xl:ps-[240px] lg:ps-[70px] ps-auto">
            <!-- <div class="w-[400px] cursor-pointer mx-auto">
                 <div class="h-[300px] rounded-lg overflow-hidden">
                     <div class="h-[70%] w-[100%] relative overflow-hidden">
                         <img src="https://i.ytimg.com/vi/Z2a8lUYe8x8/hqdefault.jpg?sqp=-oaymwEbCMQBEG5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBaSQ7uNRvsoixlHkNX-nCDgOvrGQ"
                             class="bg-white object-cover object-center w-full h-full" alt="YouTube Thumbnail">
                         <div class="bg-[#616161]  bg-transparent text-white absolute right-[10px] bottom-[10px]">
                             <p>2:31</p>
                         </div>
                         <div class="h-[4px] w-[100%] bg-red-600 absolute bottom-0"></div>
                     </div>
                     <div class="h-[30%] w-[100%] py-3 flex">
                         <div class="rounded-full h-[30px] w-[30px] bg-white me-[15px]">
                             <img src="" alt="YouTube Thumbnail" class="object-cover object-center w-full h-full">
                         </div>
                         <div class=" w-[250px] text-white">
                             <p class="line-clamp-2">
                                 Mushoku tensei
                             </p>
                             <p class="w-[100%]">Anime free</p>
                             <div class="flex-between w-[90%]">
                                 <p>10 N người xem</p>
                                 <p>-</p>
                                 <p>3 ngày trước</p>
                             </div>
                         </div>
                     </div>
                 </div>
             </div> -->
        </div>
    `
    let listFilm = document.querySelector(".listFilm")
    let subscribeChannels = document.querySelector(".subscribeChannels")
    let html = ""
    let html1 = ""
    for (let i = 0; i < 25; i++) {
        html += `
            <div class="w-[400px] cursor-pointer mx-auto">
                <div class="h-[300px] w-full rounded-lg overflow-hidden">
                    <div class="h-[70%] w-[100%] relative overflow-hidden">
                        <div class="bg-[#222222] object-cover object-center w-full h-full"></div>
                    </div>
                    <div class="h-[30%] w-[100%] py-3 flex">
                        <div class="rounded-full h-[30px] w-[30px] bg-[#222222] me-[15px] overflow-hidden">

                        </div>
                        <div class=" w-[250px] text-white">
                             <div class="flex w-[80%] h-[30%] bg-[#222222]"></div>
                            <div class="flex w-[100%] h-[30%] bg-[#222222] mt-3"></div>
                        </div>
                    </div>
                </div>
            </div>
            `
        html1 += `
                <div
                    class="text-white flex items-center w-[100%] mt-3 overflow-hidden cursor-pointer px-3 py-1 rounded-full  ">
                    <div class="rounded-full h-[20px] w-[20px] bg-[#222222] me-[30px] overflow-hidden"></div>
                    <h5 class="bg-[#222222] w-[80%] h-[20px] rounded-full"></h5>
                </div>
            `
    }
    listFilm.innerHTML = html
    subscribeChannels.innerHTML = html1
}
async function renderHomePage() {
    let listChannels = await getChannels()
    page.innerHTML = `
    <!-- Left scroll -->
        <div
            class="leftScroll bg-black xl:px-3 px-1 fixed mt-[56px] h-[calc(100vh-56px)] overflow-y-auto pb-5 xl:w-[240px] w-[90px] lg:block hidden ">
            <!-- First section-->
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
            <!-- Second section-->
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
            <!-- Third section-->
            <div class="hiddenBarBlock border-t-[1px] mt-4 border-[#3f3f3f] xl:block hidden">
                <h3 class="text-white mt-3 text-[18px]">Kênh đăng ký</h3>
                <div class="subscribeChannels">
                </div>
            </div>
        </div>
        <!-- Content -->
        <div
            class="content bg-black px-3 pt-[70px] h-[100vh] grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4 overflow-auto listFilm xl:ps-[240px] lg:ps-[70px] ps-auto">
            <!-- <div class="w-[400px] cursor-pointer mx-auto">
                 <div class="h-[300px] rounded-lg overflow-hidden">
                     <div class="h-[70%] w-[100%] relative overflow-hidden">
                         <img src="https://i.ytimg.com/vi/Z2a8lUYe8x8/hqdefault.jpg?sqp=-oaymwEbCMQBEG5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBaSQ7uNRvsoixlHkNX-nCDgOvrGQ"
                             class="bg-white object-cover object-center w-full h-full" alt="YouTube Thumbnail">
                         <div class="bg-[#616161]  bg-transparent text-white absolute right-[10px] bottom-[10px]">
                             <p>2:31</p>
                         </div>
                         <div class="h-[4px] w-[100%] bg-red-600 absolute bottom-0"></div>
                     </div>
                     <div class="h-[30%] w-[100%] py-3 flex">
                         <div class="rounded-full h-[30px] w-[30px] bg-white me-[15px]">
                             <img src="" alt="YouTube Thumbnail" class="object-cover object-center w-full h-full">
                         </div>
                         <div class=" w-[250px] text-white">
                             <p class="line-clamp-2">
                                 Mushoku tensei
                             </p>
                             <p class="w-[100%]">Anime free</p>
                             <div class="flex-between w-[90%]">
                                 <p>10 N người xem</p>
                                 <p>-</p>
                                 <p>3 ngày trước</p>
                             </div>
                         </div>
                     </div>
                 </div>
             </div> -->
        </div>
    `
    if (localStorage.getItem("statusBar")) {
        let statusBar = JSON.parse(localStorage.getItem("statusBar"));
        ToggleBar(!statusBar);
        // Lý do phải phủ định là do khi reset nó ở trạng thái false thì cần thực thi "remove" nhưng ToggleBar chỉ thực thi hàm "remove" khi trạng thái là true (Vì hàm ToggleBar dùng để chuyển đổi trạng thái không phải in trạng thái) 
    } else {
        let statusBar = true;
        ToggleBar(!statusBar);
        // Lý do phải phủ định là do khi reset nó ở trạng thái false thì cần thực thi "remove" nhưng ToggleBar chỉ thực thi hàm "remove" khi trạng thái là true  (Vì hàm ToggleBar dùng để chuyển đổi trạng thái không phải in trạng thái) 
    }
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
    // Render list of film
    let listFilm = document.querySelector(".listFilm")
    let subscribeChannels = document.querySelector(".subscribeChannels")
    let html = ""
    for (let k = 0; k < listChannels.length; k++) {
        for (let i = 0; i < listChannels[k].videos.length; i++) {
            html += `
            <div class="w-[400px] cursor-pointer mx-auto videoItem" data-channelId="${k}" data-videoId="${i}">
                <div class="h-[300px] w-full rounded-lg overflow-hidden">
                    <div class="h-[70%] w-[100%] relative overflow-hidden">
                        <img src="${listChannels[k].videos[i].img}" alt="YouTube Thumbnail""
                            class="bg-white object-cover object-center w-full h-full" alt="">
                        <div class="bg-[#616161]  bg-transparent text-white absolute right-[10px] bottom-[10px]">
                            <p>2:31</p>
                        </div>
                        <div class="h-[4px] w-[0%] bg-red-600 absolute bottom-0"></div>
                    </div>
                    <div class="h-[30%] w-[100%] py-3 flex">
                        <div class="rounded-full h-[30px] w-[30px] bg-white me-[15px] overflow-hidden">
                            <img src="${listChannels[k].avatar}" alt="YouTube Thumbnail" class="object-cover object-center w-full h-full rounded-full">
                        </div>
                        <div class=" w-[250px] text-white">
                            <p class="line-clamp-2">
                            ${listChannels[k].videos[i].name}
                            </p>
                            <p class="w-[100%]">${listChannels[k].name}</p>
                            <div class="flex w-[90%]">
                                <p>${listChannels[k].videos[i].watcher} N người</p>
                                <p class="mx-3">-</p>
                                <p>${listChannels[k].videos[i].date} trước</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
    }
    // Render list of subscribed channels
    let html1 = ""
    for (let k = 0; k < listChannels.length; k++) {
        html1 += `
                <div
                    class="text-white flex items-center w-[100%] mt-3 overflow-hidden cursor-pointer px-3 py-1  hover:bg-[#222222] rounded-full  ">
                    <div class="rounded-full h-[20px] w-[20px] bg-white me-[30px] overflow-hidden">
                        <img src="${listChannels[k].avatar}" alt="YouTube Thumbnail" class="object-cover object-center w-full h-full">
                    </div>
                    <h5 class="truncate">${listChannels[k].name}</h5>
                </div>
        `
    }
    listFilm.innerHTML = html
    subscribeChannels.innerHTML = html1
    document.querySelectorAll('.videoItem').forEach(item => {
        item.addEventListener('click', (event) => {
            renderCloneVideoPage();
            renderVideoPage(item.getAttribute("data-channelId"), item.getAttribute("data-videoId"));
        });
    });
}

export { renderVideoPage, renderCloneHomePage, renderHomePage, renderCloneVideoPage }



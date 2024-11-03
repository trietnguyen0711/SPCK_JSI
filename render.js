import { getChannels, updateNumberWatchers, uploadVideo } from "./auth.js"
import { avatar, toggleBarMain } from "./decoration.js"
import { darkLightMode, searchVideos, subscribe } from "./function.js"
import { signPage } from "./sign.js"
let page = document.querySelector(".page")
async function renderCloneVideoPage() {
    window.scrollTo(0, 0);
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
    darkLightMode()
}
async function renderVideoPage(idChannel, idVideo) {
    window.scrollTo(0, 0);
    let listChannels = await getChannels()
    updateNumberWatchers(listChannels[idChannel].email, idVideo)
    page.innerHTML = `
    <div class="content bg-black block pt-[70px] lg:flex" style="justify-content: space-around;">
            <div class="container">
                <div class="lg:w-[90%] w-full overflow-hidden" style="border:none">
                    <iframe src="${listChannels[idChannel].videos[idVideo].videoLink}"
                        title="YouTube video player" frameborder="0"
                        class="bg-white object-cover object-center w-full aspect-[2/1]"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <h1 class="my-2 text-white text-[20px] font-semibold">${listChannels[idChannel].videos[idVideo].name}</h1>
                <div class="block lg:flex items-center">
                    <div class="flex">
                        <div class="h-[40px] w-[40px] rounded-full overflow-hidden me-3">
                            <img src="${listChannels[idChannel].avatar}" alt="YouTube Thumbnail">
                        </div>
                        <div class="me-5">
                            <h4 class="text-white">${listChannels[idChannel].name}</h4>
                            <p class="text-[#9e9e9e]">${listChannels[idChannel].videos[idVideo].watcher} người</p>
                        </div>
                    </div>
                    <div class="flex lg:mt-0 mt-3">
                        <button class="rounded-full bg-white p-3 me-5">Tham gia</button>
                        <button class="rounded-full btnSubcribe bg-[#323332] text-white p-3 flex-around">
                            <i class="fa-regular fa-bell"></i>
                            <p class="mx-4 textSubcribe"></p>
                            <i class="fa-solid fa-chevron-down"></i>
                        </button>
                    </div>
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
        <div class="appearDiv"></div>
    `
    subscribe(listChannels[idChannel].name)
    // Render video
    let filmsChoice = document.querySelector(".filmsChoice")
    let html = ""
    // RenderListChoice
    for (let k = 0; k < listChannels.length; k++) {
        for (let i = 0; i < listChannels[k].videos.length; i++) {
            if (idChannel == k && idVideo == i) {
                continue;
            }
            if (listChannels[k].videos[i] == "") {
                continue;
            }
            html += `
        <div class="flex-around h-full mt-5 cursor-pointer videoItem" data-channelId="${k}" data-videoId="${i}">
            <div class="w-[168px] h-[94px] rounded-lg overflow-hidden">
                <img src="${listChannels[k].videos[i].img}"
                    class="bg-white object-cover object-center w-full h-full" alt="YouTube Thumbnail">
            </div>
            <div class="text-white w-[195px] ms-3">
                <p class="w-[195px] line-clamp-2">${listChannels[k].videos[i].name}</p>
                <p class="text-[#9e9e9e]">${listChannels[k].name}</p>
                <div class="flex">
                    <p class="text-[#9e9e9e] me-5">${listChannels[k].videos[i].watcher} người</p>
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
            toggleBarMain()
            darkLightMode()
        });
    });
    darkLightMode()
}
async function renderCloneHomePage() {
    window.scrollTo(0, 0);
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
                                 <p>10 người xem</p>
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
    let appearDiv = document.querySelector(".appearDiv")
    appearDiv.innerHTML = ""
    window.scrollTo(0, 0);
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
                                 <p>10 người xem</p>
                                 <p>-</p>
                                 <p>3 ngày trước</p>
                             </div>
                         </div>
                     </div>
                 </div>
             </div> -->
        </div>
    `
    window.scrollTo(0, 0);
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
            if (listChannels[k].videos[i] == "") {
                continue;
            }
            html += `
            <div class="w-[400px] cursor-pointer mx-auto videoItem" data-channelId="${k}" data-videoId="${listChannels[k].videos[i].id}">
                <div class="h-[300px] w-full rounded-lg overflow-hidden">
                    <div class="h-[70%] w-[100%] relative overflow-hidden">
                        <img src="${listChannels[k].videos[i].img}" alt="YouTube Thumbnail""
                            class="bg-white object-cover object-center w-full h-full" alt="">
                        <div class="bg-[#616161]  bg-transparent text-white absolute right-[10px] bottom-[10px]">
                          
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
                                <p>${listChannels[k].videos[i].watcher} người</p>
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
        if (listChannels[k] == "") {
            continue;
        }
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
    window.scrollTo(0, 0);
    document.querySelectorAll('.videoItem').forEach(item => {
        item.addEventListener('click', (event) => {
            renderCloneVideoPage();
            renderVideoPage(item.getAttribute("data-channelId"), item.getAttribute("data-videoId"));
            window.scrollTo(0, 0);
        });
    });
    darkLightMode()
}
async function renderLogPage() {
    window.scrollTo(0, 0);
    let body = document.querySelector("body")
    body.innerHTML = `
   <div class="container-fluid bg-secondary d-flex-center" style="height: 800px;">
    <div class="container p-10 sm:p-5 bor-input"
        style="width: 500px; height: 650px; background-color: rgba(255, 255, 255, 0.856);">
        <h1 class="text-center mt-0 sm:mt-4 welcome" style="font-size: 30px;
        font-weight: bold;">Chào mừng</h1>
        <div class="w-full flex justify-center items-center my-3">
            <i class="fa-solid fa-layer-group text-8xl homeSign"></i>
        </div>
        <h4 class="text-center sign">Đăng nhập tài khoản</h4>
        <h5 class="mt-5"></h5>
        <div class="nameBox hidden">
            <h5 class="mt-5">Tên tài khoản</h5>
            <input type="text" placeholder="Tên tài khoản của bạn" class="w-full p-3 border bor-input inputName inputNone">
        </div>
        <h5 class="emailNone">Email</h5>
        <input type="text" placeholder="Email của bạn" class="w-full p-3 border bor-input inputSign inputNone">
        <p class="errorEmail" style="color:red"></p>
        <h3 style="color:red"></h3>
        <h5 class="mt-3 pass">Mật khẩu</h5>
        <input type="password" placeholder="Mật khẩu của bạn" class="w-full p-3 border bor-input inputSign inputPass">
        <p class="errorPassword" style="color:red"></p>
        <h3 style="color:red"></h3>
        <div class="flex justify-between w-full">
            <p class="m-0 cursor-pointer remember text-red-600"></p>
            <a class="text-blue-600 cursor-pointer signUpForm">Không có tài khoản?</a>
        </div>
        <div class="w-full bg-yellow-500 text-center p-3 border bor-input flex justify-center items-center cursor-pointer btn">Đăng nhập</div>
    </div>
</div>

    `
    signPage()
    darkLightMode()
    window.scrollTo(0, 0);
}
async function renderVideosAcount() {
    window.scrollTo(0, 0);
    if (document.querySelector(".submitAccount")) {
        let listChannels = await getChannels()
        let submitAccount = document.querySelector(".submitAccount")
        submitAccount.addEventListener("click", () => {
            let email = localStorage.getItem("email")
            let positionemail;
            for (let i = 0; i < listChannels.length; i++) {
                if (listChannels[i].email.toLowerCase() == email) {
                    positionemail = i;
                }
            }
            let page = document.querySelector(".page")
            let videos = listChannels[positionemail].videos
            page.innerHTML = `
        <div class="h-[70px] "></div>
        <div class=" bg-black px-3 pt-[20px] h-[100vh] ps-auto w-[85%] mx-auto">
                <div class=" ms-[30px]">
                    <div class="flex border-b-[1px] border-[#3f3f3f]">
                        <div class="w-[150px] h-[150px] rounded-full overflow-hidden">
                            <img class="w-full h-full"
                                src="${listChannels[positionemail].avatar}"
                                alt="YouTube">
                        </div>
                        <div class="text-white ms-[80px]">
                            <h1 class="font-bold text-[40px]">${listChannels[positionemail].name}</h1>
                            <div class="flex">
                                <p>${listChannels[positionemail].email}</p>
                                <p class="ms-3">${listChannels[positionemail].Subscriber}</p>
                            </div>
                            <p class="truncate w-[200px] my-2">Hello everyone kakakakakakakakakakakakakakakaka</p>
                            <div
                                class="rounded-full btnUploadVideo p-3 bg-[#222222] flex-center w-[150px] mb-5 cur-pointer hover:bg-slate-500">
                                <p>Đăng tải video</p>
                            </div>
                        </div>
                    </div>
                    <div class=""></div>
                </div>
                <div
                    class="accountPageVideoList mt-5 bg-black px-3 h-[100vh] grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4  ps-auto">

                </div>

            </div>
        `
            let accountPageVideoList = document.querySelector(".accountPageVideoList")
            renderUploadPage()
            let html = ``
            if (videos.length == 0) {
                alert("Bạn chưa đăng tải bất kì video nào!")
                return 0;
            }
            for (let i = 0; i < videos.length; i++) {
                if (videos[i] == "") {
                    continue;
                }
                html += `
                <div class="w-[400px] cursor-pointer mx-auto videoItem" data-channelId="${positionemail}" data-videoId="${videos[i].id}">
                    <div class="h-[300px] w-full rounded-lg overflow-hidden">
                        <div class="h-[70%] w-[100%] relative overflow-hidden">
                            <img src="${videos[i].img}" alt="YouTube Thumbnail""
                                class="bg-white object-cover object-center w-full h-full" alt="">
                            <div class="bg-[#616161]  bg-transparent text-white absolute right-[10px] bottom-[10px]">
                                
                            </div>
                            <div class="h-[4px] w-[0%] bg-red-600 absolute bottom-0"></div>
                        </div>
                        <div class="h-[30%] w-[100%] py-3 flex">
                            <div class="rounded-full h-[30px] w-[30px] bg-white me-[15px] overflow-hidden">
                                <img src="${listChannels[positionemail].avatar}" alt="YouTube Thumbnail" class="object-cover object-center w-full h-full rounded-full">
                            </div>
                            <div class=" w-[250px] text-white">
                                <p class="line-clamp-2">
                                ${videos[i].name}
                                </p>
                                <p class="w-[100%]">${listChannels[positionemail].name}</p>
                                <div class="flex w-[90%]">
                                    <p>${videos[i].watcher} người</p>
                                    <p class="mx-3">-</p>
                                    <p>${videos[i].date} trước</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `
            }
            window.scrollTo(0, 0);
            accountPageVideoList.innerHTML = html
            document.querySelectorAll('.videoItem').forEach(item => {
                item.addEventListener('click', () => {
                    renderCloneVideoPage();
                    renderVideoPage(item.getAttribute("data-channelId"), item.getAttribute("data-videoId"));
                    toggleBarMain()
                    window.scrollTo(0, 0);
                });
            });
        })
    }
    darkLightMode()
}
async function renderUploadPage() {
    window.scrollTo(0, 0);
    let listChannels = await getChannels()
    let btnUploadVideo = document.querySelector(".btnUploadVideo")
    btnUploadVideo.addEventListener("click", () => {
        let body = document.querySelector("body")
        body.innerHTML = `
        <div class="bg-gray w-[1000px] mx-auto h-[600px]">
            <div class="max-w-4xl mx-auto font-[sans-serif] p-6">
                <div class="text-center mb-16">
                    <div class="w-full flex justify-center items-center my-3" onclick="location.reload()">
                        <i class="fa-solid fa-layer-group text-8xl homeSign"></i>
                    </div>
                    <h4 class="text-gray-800 text-base font-semibold mt-6">Thông tin video của bạn</h4>
                </div>
    
                <form>
                    <div class="grid sm:grid-cols-2 gap-8">
                        <div>
                            <label class="text-gray-800 text-sm mb-2 block">Tiêu đề video</label>
                            <input type="text"
                                class="title bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                placeholder="Tiêu đề video" />
                        </div>
                        <div>
                            <label class="text-gray-800 text-sm mb-2 block">Link ảnh nền video</label>
                            <input type="text"
                                class="backgroundImg bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                placeholder="Đường dẫn" />
                        </div>
                        <div>
                            <label class="text-gray-800 text-sm mb-2 block">Link video của bạn</label>
                            <input type="text"
                                class="videoLink bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                placeholder="Đường dẫn" />
                        </div>
                        <div>
                            <label class="text-gray-800 text-sm mb-2 block">Mô tả video</label>
                            <input type="text"
                                class="videoDescription bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                placeholder="Enter mobile number" />
                        </div>
                    </div>
    
                    <div class="!mt-12">
                        <button type="button"
                            class="confirm py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                            confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
        `
        let confirm = document.querySelector(".confirm")
        confirm.addEventListener("click", () => {
            let title = document.querySelector(".title").value
            let backgroundImg = document.querySelector(".backgroundImg").value
            let videoLink = document.querySelector(".videoLink").value
            let videoDescription = document.querySelector(".videoDescription").value
            let now = new Date();
            let dateTime = "1 years";
            let email = localStorage.getItem("email")
            let channel
            for (let i = 0; i < listChannels.length; i++) {
                if (listChannels[i].email == email) {
                    channel = listChannels[i].videos;
                }
            }
            let videoUpload = {
                watcher: 0,
                id: channel.length,
                date: dateTime,
                name: title,
                img: backgroundImg,
                videoDescription: videoDescription,
                videoLink: videoLink
            };
            uploadVideo(email, videoUpload)
        })
    })
    darkLightMode()
}
export { renderUploadPage, renderVideoPage, renderCloneHomePage, renderHomePage, renderCloneVideoPage, renderLogPage, renderVideosAcount }



import { getChannels, signIn, getUserIdByEmail } from "./auth.js";
import { avatar, toggleBarMain } from "./decoration.js";
import { renderCloneVideoPage, renderCloneHomePage, renderHomePage, renderLogPage, renderVideoPage, renderVideosAcount } from "./render.js";
function avatarMainPage() {
    let symbol = document.querySelectorAll(".symbol")
    for (let i = 0; i < symbol.length; i++) {
        symbol[i].addEventListener("click", async () => {
            renderHomePage()
            renderCloneHomePage()
        })
    }
}
// Sign in and up in main page
async function signInUpMainPage() {
    let accountBox = document.querySelector(".accountBox")
    let idChannel = 0;
    if (localStorage.getItem("email")) {
        let user = localStorage.getItem("email")
        let listChannels = await getChannels()
        for (let i = 0; i < listChannels.length; i++) {
            if (user == listChannels[i].email) {
                idChannel = i;
            }
        }
        let html = `
    <div class="rounded-full h-[40px] w-[40px] flex-center lg:bg-[#272727] hover:bg-[#272727]">
                    <i class="fa-solid fa-video "></i>
                </div>
                <div class="rounded-full h-[40px] w-[40px] flex-center lg:bg-[#272727] hover:bg-[#272727] mx-5">
                    <i class="fa-regular fa-bell"></i>
                </div>
                <div class="rounded-full h-[32px] w-[32px] bg-white overflow-hidden ">
                    <img src="${listChannels[idChannel].avatar}" alt="" class="avatarHome object-cover object-center w-full h-full">
                </div>
                <div class="infoBox absolute bg-[#272727] w-[300px]  top-[3px] left-[-145px] rounded-lg hidden">
                    <div class="w-full py-5 flex items-center border-b-[1px] border-[#3f3f3f]">
                        <div class="rounded-full h-[50px] w-[50px] bg-white overflow-hidden ms-5">
                            <img src="${listChannels[idChannel].avatar}" alt="" class="avatarHome object-cover object-center w-full h-full">
                        </div>
                        <div class="ms-5">
                            <p>${listChannels[idChannel].name}</p>
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
                        <div class="w-full lightDarkMode flex items-center cursor-pointer hover:bg-[#3e3e3e] p-3">
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
        window.scrollTo(0, 0);
        accountBox.innerHTML = html
        avatar()
        logOutMainPage()
        renderVideosAcount()
    }
    else {
        window.scrollTo(0, 0);
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
            localStorage.removeItem('email');
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

    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const keyFinding = searchInput.value.toLowerCase(); // Chuyển từ khóa thành chữ thường
            let resultListChannel = [];  // Tạo mảng để chứa kênh và video phù hợp
            let totalVideos = 0;

            // Lặp qua tất cả các kênh và tìm video khớp từ khóa
            for (let j = 0; j < listChannels.length; j++) {
                let channel = listChannels[j];
                let videos = channel.videos;
                let filteredVideos = [];
                for (let i = 0; i < videos.length; i++) {
                    if (videos[i] == "") {
                        continue;
                    }
                    if (videos[i].name.toLowerCase().includes(keyFinding)) {
                        filteredVideos.push(videos[i]);
                        totalVideos += 1;
                    }
                }

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

            if (resultListChannel.length <= 0) {
                alert("Không có kết quả nào");
                renderCloneHomePage();
                renderHomePage();
            } else {
                // InnerNumberPage
                let appearDiv = document.querySelector(".appearDiv");
                appearDiv.classList = "appearDiv w-full flex-center mt-[50px] text-white flex mx-auto text-[20px]";
                let html1 = "";

                // Tính số trang
                const videosPerPage = 10;
                const totalPages = Math.ceil(totalVideos / videosPerPage);

                for (let i = 1; i <= totalPages; i++) {
                    html1 += `
                    <span class="numberPages me-5 underline hover:text-[red] cursor-pointer text-white" data-page="${i}">${i}</span>
                    `;
                }
                appearDiv.innerHTML = html1;
                // InnerPage
                let page = document.querySelector(".page");
                let html = `<div class="h-[70px] "></div>`;
                let currentPage = 1;
                function renderPage(pageNumber) {
                    let numberPages = document.querySelectorAll(".numberPages")
                    for (let i = 0; i < numberPages.length; i++) {
                        numberPages[i].classList.remove("text-red-500")
                        numberPages[i].classList.add("text-white")
                        if (numberPages[i].getAttribute("data-page") == pageNumber) {
                            numberPages[i].classList.remove("text-white")
                            numberPages[i].classList.add("text-red-500")
                        }
                    }
                    html = `<div class="h-[70px] "></div>`;
                    let startIndex = (pageNumber - 1) * videosPerPage;
                    let coutInner = 0;
                    // Duyệt qua các kênh và video phù hợp với trang hiện tại
                    outerLoop: for (let k = 0; k < resultListChannel.length; k++) {
                        // Lớn hơn thì số đồng nghĩa tất cả các video ở kênh đó đã in hết ở trang n-1 và ở trang thứ n sẽ in những video của kênh tiếp theo
                        if (startIndex > resultListChannel[k].videos.length) {
                            startIndex -= resultListChannel[k].videos.length
                        }
                        for (let i = startIndex; i < resultListChannel[k].videos.length; i++) {
                            html += `
                                <div class="w-[80%] mt-3 cursor-pointer mx-auto videoItem" data-channelId="${k}" data-videoId="${resultListChannel[k].videos[i].id}">
                                    <div class="h-[300px] block lg:flex w-full rounded-lg overflow-hidden">
                                        <div class="lg:h-full relative overflow-hidden w-[533px]">
                                            <img src="${resultListChannel[k].videos[i].img}" alt="YouTube Thumbnail" class="bg-white object-cover object-center w-full h-full" alt="">
                                            <div class="bg-[#616161] bg-transparent text-white absolute right-[10px] bottom-[10px]">
                                                <p>2:31</p>
                                            </div>
                                            <div class="h-[4px] w-[0%] bg-red-600 absolute bottom-0"></div>
                                        </div>
                                        <div class="lg:h-full h-[30%] lg:w-[50%] w-full py-3 ms-5 flex">
                                            <div class="rounded-full h-[30px] w-[30px] bg-white me-[15px] overflow-hidden">
                                                <img src="${resultListChannel[k].avatar}" alt="YouTube Thumbnail" class="object-cover object-center w-full h-full rounded-full">
                                            </div>
                                            <div class="w-[250px] text-white">
                                                <p class="line-clamp-2">${resultListChannel[k].videos[i].name}</p>
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
                                `;
                            coutInner += 1
                            if (coutInner == videosPerPage) {
                                coutInner = 0;
                                break outerLoop; // Thoát ra khỏi cả hai vòng lặp for
                            }
                        }
                    }
                    page.innerHTML = html;

                    document.querySelectorAll('.videoItem').forEach(item => {
                        item.addEventListener('click', (event) => {
                            renderCloneVideoPage();
                            renderVideoPage(item.getAttribute("data-channelId"), item.getAttribute("data-videoId"));
                            window.scrollTo(0, 0);
                        });
                    });
                }

                // Render trang đầu tiên
                renderPage(currentPage);

                // Thêm sự kiện click cho các nút phân trang
                document.querySelectorAll('.appearDiv span').forEach(span => {
                    span.addEventListener('click', (event) => {
                        currentPage = parseInt(span.getAttribute("data-page"));
                        renderPage(currentPage);
                        window.scrollTo(0, 0);
                    });
                });
            }
        }
    });

    document.querySelectorAll('.videoItem').forEach(item => {
        item.addEventListener('click', (event) => {
            renderCloneVideoPage();
            renderVideoPage(item.getAttribute("data-channelId"), item.getAttribute("data-videoId"));
            toggleBarMain();
        });
    });
}

async function darkLightMode() {
    // let lightDarkMode = document.querySelector(".lightDarkMode")
    // let textMode = document.querySelectorAll(".textMode")
    // let boxMode = document.querySelectorAll(".boxMode")
    // let statusLightDark
    // // Set up 
    // if (localStorage.getItem("statusLightDark")) {
    //     statusLightDark = localStorage.getItem("statusLightDark")
    //     if (statusLightDark == "light") {
    //         textMode.classList.add("text-black")
    //         boxMode.classList.add("bg-black")
    //     }
    //     else {
    //         textMode.classList.remove("text-black")
    //         boxMode.classList.remove("bg-black")
    //     }
    // }
    // else {
    //     localStorage.setItem("statusLightDark", "light")
    //     textMode.classList.add("text-black")
    //     boxMode.classList.add("bg-black")
    // }
    // // change status
    // lightDarkMode.addEventListener("click", () => {
    //     for (let i = 0; i < textMode.length; i++) {
    //         if (statusLightDark == "light") {
    //             textMode[i].classList.remove("text-black")
    //             localStorage.setItem("statusLightDark", "dark")
    //         }
    //         else {
    //             textMode[i].classList.add("text-black")
    //             localStorage.setItem("statusLightDark", "light")
    //         }
    //     }
    //     for (let i = 0; i < boxMode.length; i++) {
    //         if (statusLightDark == "light") {
    //             boxMode[i].classList.remove("text-black")
    //             localStorage.setItem("statusLightDark", "dark")
    //         }
    //         else {
    //             boxMode[i].classList.add("text-black")
    //             localStorage.setItem("statusLightDark", "light")
    //         }
    //     }
    // })
}

async function subscribe(currentChannelName) {
    let listChannels = await getChannels();
    let textSubcribe = document.querySelector(".textSubcribe");
    let btnSubcribe = document.querySelector(".btnSubcribe");
    let channelsSubscriber;

    if (localStorage.getItem("email")) {
        let email = localStorage.getItem("email");
        for (let i = 0; i < listChannels.length; i++) {
            if (email == listChannels[i].email) {
                channelsSubscriber = listChannels[i].channelsSubscriber;
                break;
            }
        }
        textSubcribe.innerHTML = "Đăng ký";
        btnSubcribe.classList.remove("bg-[#323332]");
        btnSubcribe.classList.add("bg-white", "hover:bg-[#323332]", "text-black", "hover:text-white");
        for (let i = 0; i < channelsSubscriber.length; i++) {
            if (channelsSubscriber[i].name == currentChannelName) {
                textSubcribe.innerHTML = "Đã Đăng ký";
                btnSubcribe.classList.add("bg-[#323332]");
                btnSubcribe.classList.remove("bg-white", "hover:bg-[#323332]", "text-black", "hover:text-white")
            }
        }
    } else {
        textSubcribe.innerHTML = "Đăng ký";
        btnSubcribe.classList.remove("bg-[#323332]");
        btnSubcribe.classList.add("bg-white", "hover:bg-[#323332]", "text-black", "hover:text-white");
    }

    btnSubcribe.addEventListener("click", async () => {
        if (localStorage.getItem("email")) {
            // Logic xử lý khi đã đăng nhập
            // TH1: Chưa đăng ký
            // TH2: Đã đăng ký
        } else {
            alert("Vui lòng đăng nhập !");
        }
    });
}

export { avatarMainPage, signInUpMainPage, logOutMainPage, searchVideos, darkLightMode, subscribe }
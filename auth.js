// Khởi tạo auth

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyCw4ZnKjxH5OzFbZSTa6UG5EBsIRfQMv8Y",
    authDomain: "jsi-spck-9f548.firebaseapp.com",
    projectId: "jsi-spck-9f548",
    storageBucket: "jsi-spck-9f548.appspot.com",
    messagingSenderId: "1068763988407",
    appId: "1:1068763988407:web:ba6a099f8a4b0b0750a832",
    measurementId: "G-RYWSB17416"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
// Khởi tạo realtime database
import { getDatabase, ref, set, update, remove, orderByChild, get, query, equalTo } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
import { avatar } from "./decoration.js";
const database = getDatabase(app);
// Sử dụng hàm
const signUp = async (email, password, name) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user; // Lấy thông tin người dùng
        // Lưu thông tin người dùng vào Realtime Database
        await set(ref(database, 'users/' + user.uid), {
            name: name,
            email: email,
            description: "",
            avatar: "https://thatnhucuocsong.com.vn/wp-content/uploads/2023/02/anh-avatar-facebook-mac-dinh-hai-huoc.jpg",
            Subscriber: 0,
            videos: [""],
            channelsSubscriber: [""],
        });
        alert("Đăng ký thành công" + " " + user.email);
        localStorage.setItem("email", user.email);
        location.reload();
    } catch (error) {
        console.error(error); // In ra lỗi để chẩn đoán
        alert("Đăng ký thất bại ! Vui lòng đăng ký lại" + ".Lỗi : " + error);
        location.reload();
    }
};

const signIn = async (email, password) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password)
        const userName = await result.user
        alert("Chào mừng" + " " + userName.email)
        localStorage.setItem("email", userName.email)
        location.reload()
    }
    catch (error) {
        console.log(error.message)
    }
}
async function getChannels() {
    try {
        const reldata = ref(database, "users")
        const snapshot = await get(reldata)
        if (snapshot.exists()) {
            const usersDataOrigin = snapshot.val()
            const usersData = Object.values(usersDataOrigin)
            return usersData;
        }
        else {
            alert("No data")
            return 0;
        }
    } catch (error) {
        console.error("Error fetching data:", error);

    }
}
// Hàm tìm ID của user theo email
async function getUserIdByEmail(email) {
    const usersRef = ref(database, "users"); // Tham chiếu đến nút "users"

    // Tạo truy vấn để tìm user theo email
    const q = query(usersRef, orderByChild('email'), equalTo(email));

    // Thực hiện truy vấn
    const snapshot = await get(q);
    if (snapshot.exists()) {
        let userId = null;
        snapshot.forEach((childSnapshot) => {
            userId = childSnapshot.key; // Lấy key (ID) của user
        });
        return userId; // Trả về ID tìm được
    } else {
        console.log("Không tìm thấy user với email này.");
        return null; // Nếu không tìm thấy, trả về null
    }
}

// Hàm cập nhật video cho user dựa trên email
async function uploadVideo(email, videosUpload) {
    const userId = await getUserIdByEmail(email); // Lấy ID của user từ email

    if (userId) { // Nếu tìm thấy user
        const userRef = ref(database, "users/" + userId); // Tham chiếu tới user

        // Lấy dữ liệu hiện tại
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const videos = userData.videos || [];

                // Thêm video mới
                videos.push(videosUpload);

                // Cập nhật lại dữ liệu
                update(userRef, {
                    "videos": videos
                }).then(() => {
                    alert("Cập nhật video thành công!");
                    location.reload()
                }).catch((error) => {
                    alert("Lỗi khi cập nhật video:", error);
                    location.reload()
                });
            } else {
                alert("Không có dữ liệu cho user này.");
                location.reload()
            }
        }).catch((error) => {
            alert("Lỗi khi lấy dữ liệu:", error);
            location.reload()
        });
    } else {
        alert("Không thể cập nhật video do không tìm thấy user.");
        location.reload()
    }
}
// Hàm cập nhật số lượng người xem mỗi video
async function updateNumberWatchers(email, idVideo) {
    const userId = await getUserIdByEmail(email); // Lấy ID của user từ email

    if (userId) { // Nếu tìm thấy user
        const userRef = ref(database, "users/" + userId); // Tham chiếu tới user

        // Lấy dữ liệu hiện tại
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const videos = userData.videos || {};

                if (videos[idVideo]) {
                    let watcher = videos[idVideo].watcher || 0;

                    // Tăng lượt xem
                    watcher += 1;

                    // Cập nhật lại dữ liệu
                    update(userRef, {
                        [`videos/${idVideo}/watcher`]: watcher
                    }).then(() => {
                    }).catch((error) => {
                        alert("Lỗi hệ thống khi cập nhật:", error);
                    });
                } else {
                    alert("Không tìm thấy video với ID này.");
                }
            } else {
                alert("Không có dữ liệu cho user này.");
            }
        }).catch((error) => {
            alert("Lỗi khi lấy dữ liệu:", error);
        });
    } else {
        alert("Lỗi hệ thống: Không tìm thấy user.");
        location.reload();
    }
}
// Hàm cập nhật "số lượng người đăng ký" của một kênh
async function updateSubcribers(email) {
    const userId = await getUserIdByEmail(email); // Lấy ID của user từ email

    if (userId) { // Nếu tìm thấy user
        const userRef = ref(database, "users/" + userId); // Tham chiếu tới user

        // Lấy dữ liệu hiện tại
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                let Subscriber = parseInt(userData.Subscriber) || 0;
                // Tăng lượt đăng ký
                Subscriber += 1;

                // Cập nhật lại dữ liệu
                update(userRef, {
                    Subscriber: Subscriber
                }).then(() => {
                }).catch((error) => {
                    alert("Lỗi hệ thống khi cập nhật:", error);
                });
            } else {
                alert("Không có dữ liệu cho user này.");
            }
        }).catch((error) => {
            alert("Lỗi khi lấy dữ liệu:", error);
        });
    } else {
        alert("Lỗi hệ thống: Không tìm thấy user.");
        location.reload();
    }
}
// Hàm cập nhật "những kênh đã đăng ký" của một kênh
async function updateChannelSubcribe(email, currentChannelName, currentChannelAvatar) {
    const userId = await getUserIdByEmail(email)
    if (userId) {
        const userRef = ref(database, "users/" + userId)
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val()
                let channelsSubscriber = userData.channelsSubscriber || []

                // Thêm kênh mới vào danh sách
                channelsSubscriber.push({
                    name: currentChannelName,
                    avatar: currentChannelAvatar
                })

                // Cập nhật lại danh sách trên database
                update(userRef, { channelsSubscriber }).then(() => {
                    alert("Đăng ký thành công!")
                }).catch((error) => {
                    alert("Lỗi khi cập nhật dữ liệu:", error)
                })
            }
        }).catch((error) => {
            alert("Lỗi khi lấy dữ liệu:", error);
        })
    } else {
        alert("Lỗi hệ thống: Không tìm thấy user.");
        location.reload();
    }
}
export { getChannels, signUp, signIn, uploadVideo, updateNumberWatchers, getUserIdByEmail, updateSubcribers, updateChannelSubcribe }
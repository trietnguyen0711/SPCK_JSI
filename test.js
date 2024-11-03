// Lấy các phần tử
const video = document.getElementById("my-video");
const playPauseBtn = document.getElementById("play-pause");
const progressBar = document.getElementById("progress-bar");

// Phát hoặc tạm dừng video khi nhấn nút
playPauseBtn.addEventListener("click", () => {
    if (video.paused) {
        video.play();
        playPauseBtn.textContent = "⏸️";
    } else {
        video.pause();
        playPauseBtn.textContent = "▶️";
    }
});

// Cập nhật thanh tiến trình khi video phát
video.addEventListener("timeupdate", () => {
    const progress = (video.currentTime / video.duration) * 100;
    progressBar.value = progress;
});

// Cập nhật thời gian video khi kéo thanh tiến trình
progressBar.addEventListener("input", (e) => {
    const newTime = (e.target.value / 100) * video.duration;
    video.currentTime = newTime;
});

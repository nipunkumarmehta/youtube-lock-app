const API_KEY = "AIzaSyDrLTOjbOngG41SBgXe77P-ffMFIAQnWjg";
const CHANNEL_ID = "UC5eNNOs7LjOnugFnqKJS8eA";

let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "400",
        width: "100%",
        videoId: "",
        playerVars: { autoplay: 0, controls: 1 }
    });
}

async function loadVideos() {
    const url = `
        https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}
        &part=snippet,id&order=date&maxResults=50
    `;

    const res = await fetch(url);
    const data = await res.json();

    const videoContainer = document.getElementById("video-list");
    videoContainer.innerHTML = "";

    let firstVideo = null;

    data.items.forEach(item => {
        if (!item.id.videoId) return;
        if (item.snippet.title.includes("Shorts") || item.snippet.title.includes("#shorts")) return;

        if (!firstVideo) firstVideo = item.id.videoId;

        const div = document.createElement("div");
        div.className = "video-item";
        div.innerHTML = `
            <img class="thumbnail" src="${item.snippet.thumbnails.medium.url}">
            <div class="title">${item.snippet.title}</div>
        `;

        div.onclick = () => {
            player.loadVideoById(item.id.videoId);
        };

        videoContainer.appendChild(div);
    });

    if (firstVideo) player.loadVideoById(firstVideo);
}

window.onload = loadVideos;

// INSERT YOUR API KEY AND CHANNEL ID HERE AFTER TESTING
const API_KEY = "AIzaSyDrLTOjbOngG41SBgXe77P-ffMFIAQnWjg";
const CHANNEL_ID = "UC5eNNOs7LjOnugFnqKJS8eA";

// Load YouTube Iframe script
const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);

let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "300",
        width: "100%",
        videoId: "",
        playerVars: { autoplay: 0 }
    });
}

async function loadVideos() {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&type=video&order=date&maxResults=50`;

    const response = await fetch(url);
    const data = await response.json();

    const videoList = document.getElementById("video-list");

    data.items.forEach(item => {
        const videoId = item.id.videoId;
        const title = item.snippet.title;
        const thumbnail = item.snippet.thumbnails.medium.url;

        const div = document.createElement("div");
        div.className = "video-item";
        div.innerHTML = `
            <img class="thumbnail" src="${thumbnail}" />
            <p>${title}</p>
        `;
        div.onclick = () => player.loadVideoById(videoId);

        videoList.appendChild(div);
    });
}

loadVideos();

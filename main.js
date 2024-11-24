
import { avatarMainPage, logOutMainPage, searchVideos, signInUpMainPage } from "./function.js";
import { channelsSubscriber, renderCloneHomePage, renderHomePage, renderVideoPage, renderVideosAcount } from "./render.js";

renderCloneHomePage()
renderHomePage()
avatarMainPage()
signInUpMainPage()
logOutMainPage()
searchVideos()
renderVideosAcount()
channelsSubscriber(localStorage.getItem("email"))
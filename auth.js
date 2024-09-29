
async function getChannels() {
    try {
        let response = await fetch("https://66d5e290f5859a704267c69d.mockapi.io/chanelsList")
        let chanelsList = await response.json()
        return chanelsList
    } catch (error) {
        console.log(error)
    }
}

export { getChannels }
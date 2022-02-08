var players = []
var avatars = []
var alts = []
var storage = window.sessionStorage
var audioManager = new AudioManager()

function AddCharacter(name, altText){
    let btn = document.getElementById(name + "-btn")
    avatars.push(name)
    alts.push(altText)
    btn.classList.add("btn-success")
    btn.classList.remove("btn-danger")
    btn.ariaPressed = "true"
    btn.onclick = function() {RemoveCharacter(name)}
    audioManager.Play("Characters", name)
}

function RemoveCharacter(name){
    let btn = document.getElementById(name + "-btn")
    let index = avatars.indexOf(name)
    avatars.splice(index,1)
    btn.classList.add("btn-danger")
    btn.classList.remove("btn-success")
    btn.ariaPressed = "false"
    btn.onclick = function() {AddCharacter(name)}
}

function AssignCharacters(){
    if(avatars.length < 3){
        audioManager.Play("SFX", "error")
        return
    }

    for(let i=0; i < avatars.length; i++){
        players.push(new Player(avatars[i], alts[i]))
        players[i].SetRole(i)
    }

    audioManager.Play("SFX", "submit")

    setTimeout(function(){
        SaveCharacters()
        LoadGameState()
    }, 3000)
}

function ClearSaveData(){
    sessionStorage.clear();
}

function SaveCharacters(){
    let strPlayers = JSON.stringify(players)
    sessionStorage.setItem("players", strPlayers)
    console.log(storage.getItem("players"))
}

function LoadGameState(){
    window.location.href = "game.html"
}
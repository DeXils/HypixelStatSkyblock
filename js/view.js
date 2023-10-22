"use strict";

const view = {
    searchBtn: document.getElementById("searchButton"),
    searchInput: document.getElementById("searchInput"),
    currentPlayer: document.getElementById("currentPlayer"),
    currentHubPlayer: document.getElementById("currentHubPlayer"),
    currentGardenPlayer: document.getElementById("currentGardenPlayer"),
    currentMiningPlayer: document.getElementById("currentMiningPlayer"),
    currentDungeonPlayer: document.getElementById("currentDungeonPlayer"),

    update: (model) => {
        searchInput.value = model.getResultLastPlayer().username || "";
    },

}
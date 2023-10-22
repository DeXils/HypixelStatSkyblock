"use strict";

let model = new Model();

const search = () => {
    model.getPlayerInformations(view.searchInput.value).then(async (res) => {
        const { username, uuid } = res;
        if (!username || !uuid) {
            alert("Player not found");
        } else {
            console.log(username +" - " + uuid);
            await model.get3DSkinOfPlayer(uuid);
            await model.getHeadSkinOfPlayer(uuid);
            view.update(model);
        }
    });
};

view.searchBtn.addEventListener("click", search);
view.searchInput.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter") search();
});

document.addEventListener("DOMContentLoaded", async () =>{
    model.getCurrentPlayerCount();
});

"use strict";

/*
* Class Model
*/
class Model {
    /**
     * Clé de l'api
     * @type {string}
     */
    _apiKey;

    /**
     * UUID du dernière joueur + username
     * @type {{username: string, uuid:string}}
     */
    _resultLastPlayer;

    /**
     * Status du joueur
     */
    _connected;

    /**
     * Stats du joueur
     * @type Object
     */
    _statsSkyblock;

    /**
     * Profiles présents
     * @type {{profileId: string, profileName:string}}
     */
    _skyblockProfiles;

    constructor() {
        this._apiKey = "873c54ac-63c6-4169-8994-1c6b15e72506";
        this._skyblockProfiles = [];
    }

    // Getters et Setters

    /**
     * Retourne l'username et l'uuid du dernier joueur
     * @returns {{username: string, uuid: string}}
     */
    getResultLastPlayer() {
        return this._resultLastPlayer;
    }

    setResultLastPlayer(username, uuid, ){
        this._resultLastPlayer = {
            username: username,
            uuid: uuid
        };
    }

    setSkyblockProfiles(profileId,ProfileName) {
        this._skyblockProfiles = {
            profileId: profileId
        }
    }

    // Méthods

    async getPlayerInformations(username) {
        try {
            const res = await fetch(`https://api.ashcon.app/mojang/v2/user/${username}`);
            const data = await res.json();
            this.setResultLastPlayer(data.username, data.uuid);
            return this._resultLastPlayer;
        } catch (err) {
            return console.log(err);
        }
    }

    /**
     * Récupère le skin du joueur
     * @param username
     * @returns {Promise}
     */
    async get3DSkinOfPlayer(username) {
        try {
            const res = await fetch(`https://crafthead.net/body/${username}`);
            const data = await res.json();
            return data;
        } catch (err) {
            return console.log(err);
        }
    }

    /**
     * Récupère la tête du joueur
     * @param username
     * @returns {Promise}
     */
    async getHeadSkinOfPlayer(username) {
        try {
            const res = await fetch(`https://crafthead.net/avatar/${username}`);
            const data = await res.json();
            return data;
        } catch (err) {
            return console.log(err);
        }
    }

    /**
     * Return the current online players count
     * @returns {number}
     */
    async getCurrentPlayerCount() {
        const res = await fetch(
            `https://api.hypixel.net/counts?key=${this._apiKey}`
        );
        const data = await res.json();
        console.log(data);
        view.currentPlayer.innerHTML = `Nombre de joueur présent sur le Skyblock : ${data.games.SKYBLOCK.players}`;
        view.currentHubPlayer.innerHTML = `Hub : ${data.games.SKYBLOCK.modes.hub}`;
        view.currentGardenPlayer.innerHTML = `Garden : ${data.games.SKYBLOCK.modes.garden}`;
        view.currentMiningPlayer.innerHTML = `Mining : ${(data.games.SKYBLOCK.modes.mining_1 + data.games.SKYBLOCK.modes.mining_2 + data.games.SKYBLOCK.modes.mining_3)}`;
        view.currentDungeonPlayer.innerHTML = `Dungeon : ${(data.games.SKYBLOCK.modes.dungeon + data.games.SKYBLOCK.modes.dungeon_hub )}`;
        return data.playerCount;
    }

    /**
     * Ajoute les profiles présent a skyblockProfiles
     * @param profileId
     * @param profileName
     */
    addToSkyblockProfiles(profileId,profileName) {
        this._skyblockProfiles.profileId.push(profileId);
        this._skyblockProfiles.profileId.push(profileName);
    }

    /**
     * Retourne les données du joueur, => Récupération des UUID des différent profile
     * @returns {Object}
     */
    async getPlayerStats(uuid = this._result.uuid) {
        const res = await fetch(
            `https://api.hypixel.net/player?key=${this._apiKey}&uuid=${uuid}`
        );
        const data = await res.json();

        // Get status time
        let skyblockProfiles = data.player.SkyBlock.profiles;

        skyblockProfiles.forEach((element) => {
            this.addToSkyblockProfiles(element.profileId, element.profileName);
        })
        console.log(data);
        return data;
    }

}
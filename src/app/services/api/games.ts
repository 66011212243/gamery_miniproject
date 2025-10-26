import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../config/constants';
import { lastValueFrom } from 'rxjs';
import { GameTypeGetRes } from '../../model/gametype_get_res';
import { GameGetRes } from '../../model/game_get_res';

@Injectable({
    providedIn: 'root'
})

export class Games {
    constructor(private constants: Constants, private http: HttpClient) { }

    async createGame(formData: FormData) {
        const url = this.constants.API_ENDPOINT + '/creategame';
        try {
            const response = await lastValueFrom(this.http.post(url, formData));
            console.log(response);
        } catch (error) {
            console.error("POST failed:", error);
        }
    }

    async getgameType() {
        const url = this.constants.API_ENDPOINT + '/getgametype';
        const response = await lastValueFrom(this.http.get(url));
        return response as GameTypeGetRes[];
    }

    async getAllGames() {
        const url = this.constants.API_ENDPOINT + '/getgames';
        const response = await lastValueFrom(this.http.get(url));
        return response as GameGetRes[];
    }

    async getGameById(game_id: number) {
        const url = `${this.constants.API_ENDPOINT}/getGamesById/${game_id}`;
        const response = await lastValueFrom(this.http.get(url));
        return response as GameGetRes[];
    }

    async editGame(game_id: number, formData: FormData) {
        const url = `${this.constants.API_ENDPOINT}/editgame/${game_id}`;
        try {
            const response = await lastValueFrom(this.http.put(url, formData));
            console.log(response);
        } catch (error) {
            console.error("POST failed:", error);
        }
    }

    async deleteGame(game_id: number) {
        const url = `${this.constants.API_ENDPOINT}/deleteGame/${game_id}`;
        try {
            const response = await lastValueFrom(this.http.delete(url));
            console.log(response);
        } catch (error) {
            console.error("POST failed:", error);
        }
    }

    async searchgame(searchgame: string) {
        const url = this.constants.API_ENDPOINT + '/search';
        const body = { name: searchgame};
        const response = await lastValueFrom(this.http.post<GameGetRes[]>(url, body));
        return response;
    }
}
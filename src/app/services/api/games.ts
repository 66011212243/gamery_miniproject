import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../config/constants';
import { lastValueFrom } from 'rxjs';
import { GameTypeGetRes } from '../../model/gametype_get_res';
import { GameGetRes } from '../../model/game_get_res';
import { DiscountGetRes } from '../../model/discount_get_res';
import { CheckCartGetResponse } from '../../model/chackCart_get_res';
import { CartGetResponse } from '../../model/cart_get_res';
import { UserDiscountGetRes } from '../../model/user_discount_get_res';

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
        const body = { name: searchgame };
        const response = await lastValueFrom(this.http.post<GameGetRes[]>(url, body));
        return response;
    }

    async createDiscount(code_name: string, discount: number, max_uses: number) {
        const url = this.constants.API_ENDPOINT + '/createDiscount';
        const body = {
            code_name: code_name,
            discount: discount,
            max_uses: max_uses
        }
        try {
            const response = await lastValueFrom(this.http.post(url, body));
            console.log(response);
        } catch (error) {
            console.error("POST failed:", error);
        }
    }

    async getDiscount() {
        const url = this.constants.API_ENDPOINT + '/getDiscount';
        const response = await lastValueFrom(this.http.get(url));
        return response as DiscountGetRes[];
    }

    async addCart(user_id: number, game_id: number) {
        const url = this.constants.API_ENDPOINT + '/addCart';
        const body = {
            user_id: user_id,
            game_id: game_id
        }
        try {
            const response = await lastValueFrom(this.http.post(url, body));
            console.log(response);
        } catch (error) {
            console.error("POST failed:", error);
        }
    }

    async chackCart(user_id: number, game_id: number) {
        const url = this.constants.API_ENDPOINT + '/checkCart';
        const body = {
            user_id: user_id,
            game_id: game_id
        }
        try {
            const response = await lastValueFrom(this.http.post(url, body));
            return response as CheckCartGetResponse[];
        } catch (error) {
            console.error("POST failed:", error);
            return [];
        }
    }

    async getCart(user_id: number) {
        const url = `${this.constants.API_ENDPOINT}/getCart/${user_id}`;
        const response = await lastValueFrom(this.http.get(url));
        return response as CartGetResponse[];
    }

    async orderGame(selectedGameIds: number[]) {
        const url = `${this.constants.API_ENDPOINT}/orderGame?games=${selectedGameIds.join(',')}`;
        const response = await lastValueFrom(this.http.get(url));
        return response as GameGetRes[];
    }

    async getDiscountByname(name: string) {
        const url = this.constants.API_ENDPOINT + '/discountByname';
        const body = {
            name: name
        }
        const response = await lastValueFrom(this.http.post(url, body));
        return response as DiscountGetRes[];
    }

    async userDiscount(user_id: number, discount_id: number) {
        const url = this.constants.API_ENDPOINT + '/checkDiscount';
        const body = {
            user_id: user_id,
            discount_id: discount_id
        }
        try {
            const response = await lastValueFrom(this.http.post(url, body));
            return response as UserDiscountGetRes[];
        } catch (error) {
            console.error("POST failed:", error);
            return [];
        }
    }

    async adduserDiscount(user_id: number, discount_id: number) {
        const url = this.constants.API_ENDPOINT + '/addUserDiscount';
        const body = {
            user_id: user_id,
            discount_id: discount_id
        }
        try {
            const response = await lastValueFrom(this.http.post(url, body));
            console.log(response);
        } catch (error) {
            console.error("POST failed:", error);
        }
    }

    async deleteCart(game_id: number) {
        const url = `${this.constants.API_ENDPOINT}/deleteCart/${game_id}`;
        try {
            const response = await lastValueFrom(this.http.delete(url));
            console.log(response);
        } catch (error) {
            console.error("POST failed:", error);
        }
    }


    async addOrderGame(
        user_id: number,
        total_price: number,
        game_ids: number[],   
        discount_code_id?: number
    ) {
        const url = this.constants.API_ENDPOINT + '/addOrderGame';
        const body = {
            user_id,
            total_price,
            game_ids,
            discount_code_id: discount_code_id || null
        };

        try {
            const response = await lastValueFrom(this.http.post(url, body));
            console.log(response);
        } catch (error) {
            console.error("POST failed:", error);
        }
    }


}
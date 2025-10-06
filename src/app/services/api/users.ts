import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../config/constants';
import { lastValueFrom } from 'rxjs';
import { UserGetRes } from '../../model/user_get_res';

@Injectable({
    providedIn: 'root'
})

export class Users {
    constructor(private constants: Constants, private http: HttpClient) { }

    async register(formData: FormData) {
        const url = this.constants.API_ENDPOINT + '/register';
        try {
            const response = await lastValueFrom(this.http.post(url, formData));
            console.log(response);
        } catch (error) {
            console.error("POST failed:", error);
        }
    }

    public async login(email: string, password: string): Promise<UserGetRes[]> {
        const body = {
            email: email,
            password: password
        }
        const url = this.constants.API_ENDPOINT + '/login';
        try {
            const response = await lastValueFrom(this.http.post(url, body,{ withCredentials: true }));
            console.log(response);
            return response as UserGetRes[];
        } catch (error) {
            console.error("POST failed:", error);
            return [];
        }

    }

    public async logout() {
        const url = this.constants.API_ENDPOINT + '/logout';

        // ใช้ lastValueFrom กับ http.post และใส่ withCredentials
        const response = await lastValueFrom(
            this.http.post(url, {}, { withCredentials: true })
        );

        return response;
    }

    getProfile() {
        const url = this.constants.API_ENDPOINT + '/profile';
        return this.http.get(url, { withCredentials: true });
    }

    public async checkAdmin() {
        const url = this.constants.API_ENDPOINT + '/admin';
        const response = await lastValueFrom(
            this.http.get(url, { withCredentials: true })
        );
        return response;
    }

    public async editProfile(user_id : Number,formData: FormData) {
        const url = `${this.constants.API_ENDPOINT}/updateProfile/${user_id}`;
        try {
            const response = await lastValueFrom(this.http.put(url, formData));
            console.log(response);
        } catch (error) {
            console.error("POST failed:", error);
        }
    }

    public async getUserById(user_id: Number): Promise<UserGetRes | null> {
        const url = `${this.constants.API_ENDPOINT}/user/${user_id}`;
        try {
            const response = await lastValueFrom(this.http.get<UserGetRes[]>(url));
            return response[0] ?? null;
        } catch (error) {
            console.error("POST failed:", error);
            return null;
        }
    }
}
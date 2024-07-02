"use server"
import { cookieInfo } from 'lib';

export default async function myOrder_data(page, per_page) {
    const userToken = await cookieInfo();
    //console.log(userToken);

    const res = await fetch(`http://localhost:8000/my_orders?page=${page}&per_page=${per_page}`, {
        headers: {
            userInfo: userToken
        },
        cache: 'no-store' }).then(res => res.json());
    return res;
}
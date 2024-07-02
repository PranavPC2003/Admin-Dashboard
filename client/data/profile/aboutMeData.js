import { cookieInfo } from 'lib';

export default async function user_aboutMe() {
    
    // const userInfo = await cookieInfo();
    // console.log(userInfo);

    const res = await fetch('http://localhost:8000/api/profile/aboutMe', {
        method: 'GET',
        // headers: {
        //     'Content-Type': 'application/json',
        //     'username': username,
        // },
        cache: 'no-store',
    }).then(res => res.json());
    return res;
}
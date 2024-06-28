import React from 'react'


export default async function user_aboutMe() {
    const res = await fetch('http://localhost:8000/api/profile/aboutMe', { cache: 'no-store'}).then(res => res.json());
    return res;
}
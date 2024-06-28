export default async function userOrder_data(username) {
    const res = await fetch(`http://localhost:8000/user_orders?username=${username}`, { cache: 'no-store'}).then(res => res.json());
    return res;
}
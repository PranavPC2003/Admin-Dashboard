export default async function myOrder_data(page, per_page) {
    const res = await fetch(`http://localhost:8000/my_orders?page=${page}&per_page=${per_page}`, { cache: 'no-store'}).then(res => res.json());
    return res;
}
import Link from 'next/link';
import { Col, Row, Card, Table, Image, Pagination } from 'react-bootstrap';
import { Suspense, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import myOrder_data from 'data/dashboard/MyOrderData';


async function MyComponent() {
    return (
        <Suspense fallback={<div></div>}>
            <MyOrders />
        </Suspense>
    )
}

const MyOrders = () => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const page = searchParams.get('page') ?? '1';
    const per_page = searchParams.get('per_page') ?? '5';
    const o_data = use(myOrder_data(page, per_page), { cache: 'no-store' });

    return (
        <Row className="mt-6">
            <Col md={12} xs={12}>
                <Card>
                    <Card.Header className="bg-white  py-4">
                        <h4 className="mb-0">My Orders</h4>
                    </Card.Header>
                    <Table responsive className="text-nowrap mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Orders</th>
                                <th>User</th>
                                <th>Course</th>
                                <th>Timestamp</th>
                                <th>Col5</th>
                            </tr>
                        </thead>
                        <tbody>
                            {o_data.data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="align-middle">
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <div className={`icon-shape icon-md border p-4 rounded-1 ${item.brandLogoBg}`}>
                                                        <Image src={item.brandLogo} alt="" />
                                                    </div>
                                                </div>
                                                <div className="ms-3 lh-1">
                                                    <h5 className=" mb-1">
                                                        <Link href="#" className="text-inherit">{item.order_title}</Link>
                                                    </h5>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle"><a href={`http://localhost:3000/pages/orders/user_orders?username=${item.username}`}>{item.username}</a></td>
                                        <td className="align-middle">{item.course}</td>
                                        <td className="align-middle">{item.timestamp}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <Card.Footer className="bg-white text-center">
                        {/* <Pagination className="justify-content-end">
                            <Pagination.Prev disabled={page === '1'}>
                                <Link href={`?page=${Number(page) - 1}&per_page=${Number(per_page)}`}>Previous</Link>
                            </Pagination.Prev>
                            <Pagination.Item disabled={page === '1'}>
                                <Link href={`?page=${Number(page) - 1}&per_page=${per_page}`}>{parseInt(page) - 1}</Link>
                            </Pagination.Item>
                            <Pagination.Item>
                                <Link href={`?page=${Number(page)}&per_page=${Number(per_page)}`}>{page}</Link>
                            </Pagination.Item>
                            <Pagination.Item disabled={page === o_data.totalPages.toString()}>
                                <Link href={`?page=${Number(page) + 1}&per_page=${Number(per_page)}`}>{parseInt(page) + 1}</Link    >
                            </Pagination.Item>
                            <Pagination.Next disabled={page === o_data.totalPages.toString()}>
                                <Link href={`?page=${Number(page) + 1}&per_page=${Number(per_page)}`}>Next</Link>
                            </Pagination.Next>
                        </Pagination> */}
                        <Pagination className="justify-content-end">
                            <Pagination.Prev onClick={() => {
                                router.replace(`?page=${Number(page) - 1}&per_page=${per_page}`)
                            }} disabled={page === '1'}>Previous</Pagination.Prev>
                            <Pagination.Item onClick={() => {
                                router.replace(`?page=${Number(page) - 1}&per_page=${per_page}`)
                            }} disabled={page === '1'}>{parseInt(page) - 1}</Pagination.Item>
                            <Pagination.Item onClick={() => {
                                router.replace(`?page=${Number(page)}&per_page=${per_page}`)
                            }}>{page}</Pagination.Item>
                            <Pagination.Item onClick={() => {
                                router.replace(`?page=${Number(page) + 1}&per_page=${per_page}`)
                            }} disabled={page === o_data.totalPages.toString()}>{parseInt(page) + 1}</Pagination.Item>
                            <Pagination.Next onClick={() => {
                                router.replace(`?page=${Number(page) + 1}&per_page=${per_page}`)
                            }} disabled={page === o_data.totalPages.toString()}>Next</Pagination.Next>
                        </Pagination>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    )
}

export default MyComponent;
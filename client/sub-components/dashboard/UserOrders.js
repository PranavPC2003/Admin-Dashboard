// import node module libraries
import Link from 'next/link';
import { Col, Row, Card, Table, Image } from 'react-bootstrap';
import { Fragment, Suspense, use } from 'react';
import { useSearchParams } from 'next/navigation'
import userOrder_data from 'data/dashboard/UserOrdersData';

function MyComponent() {
    return (
        <Suspense fallback={<div></div>}>
            <UserOrders />
        </Suspense>
    )
}

const UserOrders = () => {
    const searchParams = useSearchParams()
    const username = searchParams.get('username');
    const u_data = use(userOrder_data(username), { cache: 'no-store' });
    const order_data = u_data.orders;
    const user_data = u_data.users[0];

    return (
        <Fragment>
            <Card style={{ "marginTop": "20px", "marginLeft": "20px"}}>
                <h1><b>{user_data.name}</b></h1>
                <h4><b>Username:</b> {user_data.username}</h4>
                <h4><b>Email:</b> {user_data.email}</h4>
                <h4><b>Phone:</b> {user_data.phone}</h4>
            </Card>
            <Row className="mt-6">
                <Col md={12} xs={12}>
                    <Card>
                        <Card.Header className="bg-white  py-4">
                            <h4 className="mb-0">User Activity</h4>
                        </Card.Header>
                        <Table responsive className="text-nowrap mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>Activity</th>
                                    <th>User</th>
                                    <th>Course</th>
                                    <th>Timestamp</th>
                                    <th>Col5</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order_data.map((item, index) => {
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
                                                            <Link href="#" className="text-inherit">{item.order_title}</Link></h5>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="align-middle"><Link href={`http://localhost:3000/pages/orders/user_orders?username=${item.username}`}>{item.username}</Link></td>
                                            <td className="align-middle">{item.course}</td>
                                            <td className="align-middle">{item.timestamp}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                        <Card.Footer className="bg-white text-center">
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
}

export default MyComponent;
// import node module libraries
import Link from 'next/link';
import { Col, Row, Card, Table, Image, Pagination } from 'react-bootstrap';
import { Suspense, use} from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
// import required data files
// import ActiveProjectsData from "data/dashboard/ActiveProjectsData";
import ractivity_data from 'data/dashboard/RecentActivityData';

function MyComponent() {
    return (
        <Suspense fallback={<div></div>}>
            <RecentActivity />
        </Suspense>
    )
}

const RecentActivity = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const page = searchParams.get('page') ?? '1';
    const per_page = searchParams.get('per_page') ?? '5';
    const r_data = use(ractivity_data(page, per_page), { cache: 'no-store' });

    return (
        <Row className="mt-6">
            <Col md={12} xs={12}>
                <Card>
                    <Card.Header className="bg-white  py-4">
                        <h4 className="mb-0">Recent Activity</h4>
                    </Card.Header>
                    <Table responsive className="text-nowrap mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Activity</th>
                                <th>Users</th>
                                <th>Timestamp</th>
                                <th>Col4</th>
                                <th>Col5</th>
                            </tr>
                        </thead>
                        <tbody>
                            {r_data.data.map((item, index) => {
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
                                                        <Link href="#" className="text-inherit">{item.activity}</Link></h5>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle">{item.User}</td>
                                        {/* <td className="align-middle">{Date(item.timestamp)}</td> */}
                                        <td className="align-middle">{new Date(item.timestamp / 1000).toLocaleDateString('en-US')}</td>
                                        {/* <td className="align-middle"><span className={`badge bg-${item.priorityBadgeBg}`}>{item.priority}</span></td> */}
                                        <td className="align-middle">
                                            {/* <div className="avatar-group">
                                                {item.members.map((avatar, avatarIndex) => {
                                                    return (
                                                        <span className="avatar avatar-sm" key={avatarIndex}>
                                                            <Image alt="avatar" src={avatar.image} className="rounded-circle" />
                                                        </span>
                                                    )
                                                })}
                                                <span className="avatar avatar-sm avatar-primary">
                                                    <span className="avatar-initials rounded-circle fs-6">+5</span>
                                                </span>
                                            </div> */}
                                        </td>
                                        <td className="align-middle text-dark">
                                            {/* <div className="float-start me-3">{item.progress}%</div>
                                            <div className="mt-2">
                                                <ProgressBar now={item.progress} style={{ height: '5px' }} />
                                            </div> */}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <Card.Footer className="bg-white text-center">
                        {/* <Link href="#" className="link-primary">View All Projects</Link> */}
                        <Pagination className="justify-content-end">
                            <Pagination.Prev onClick={() => {
                                router.replace(`/?page=${Number(page) - 1}&per_page=${per_page}`, { scroll: false })
                            }} disabled={page === '1'}>Previous</Pagination.Prev>
                            <Pagination.Item onClick={() => {
                                router.replace(`/?page=${Number(page) - 1}&per_page=${per_page}`, { scroll: false })
                            }} disabled={page === '1'}>{parseInt(page) - 1}</Pagination.Item>
                            <Pagination.Item onClick={() => {
                                router.replace(`/?page=${Number(page)}&per_page=${per_page}`, { scroll: false })
                            }}>{page}</Pagination.Item>
                            <Pagination.Item onClick={() => {
                                router.replace(`/?page=${Number(page) + 1}&per_page=${per_page}`, { scroll: false })
                            }} disabled={page === r_data.totalPages.toString()}>{parseInt(page) + 1}</Pagination.Item>
                            <Pagination.Next onClick={() => {
                                router.replace(`/?page=${Number(page) + 1}&per_page=${per_page}`, { scroll: false })
                            }} disabled={page === r_data.totalPages.toString()}>Next</Pagination.Next>
                        </Pagination>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    )
}

export default MyComponent;
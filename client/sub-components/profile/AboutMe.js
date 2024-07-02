// import node module libraries
import { Col, Row, Card } from 'react-bootstrap';
import user_aboutMe from 'data/profile/aboutMeData';
import { use } from 'react';


const AboutMe = () => {

    const aboutMe = use(user_aboutMe());

    return (
        <Col xl={6} lg={12} md={12} xs={12} className="mb-6">
            {/* card */}
            <Card>
                {/* card body */}
                <Card.Body>
                    {/* card title */}
                    <Card.Title as="h4">About Me</Card.Title>
                    <span className="text-uppercase fw-medium text-dark fs-5 ls-2">Bio</span>
                    <p className="mt-2 mb-6">{aboutMe.about_me}</p>
                    <Row>
                        <Col xs={12} className="mb-5">
                            <h6 className="text-uppercase fs-5 ls-2">Position</h6>
                            <p className="mb-0">{aboutMe.teams}</p>
                        </Col>
                        <Col xs={6} className="mb-5">
                            <h6 className="text-uppercase fs-5 ls-2">Phone </h6>
                            <p className="mb-0">{aboutMe.phone}</p>
                        </Col>
                        <Col xs={6} className="mb-5">
                            <h6 className="text-uppercase fs-5 ls-2">Date of Birth </h6>
                            <p className="mb-0">01.10.1997(static)</p>
                        </Col>
                        <Col xs={6}>
                            <h6 className="text-uppercase fs-5 ls-2">Email </h6>
                            <p className="mb-0">{aboutMe.email}</p>
                        </Col>
                        <Col xs={6}>
                            <h6 className="text-uppercase fs-5 ls-2">Location</h6>
                            <p className="mb-0">{aboutMe.address.city}</p>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default AboutMe
'use client'

// import node module libraries
import { Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import useMounted from 'hooks/useMounted';
import axios from 'axios';

const SignIn = () => {
  const hasMounted = useMounted();
  const { register, handleSubmit } = useForm();

  const onSubmitFunc = async (data) => {
    try {
      await axios.post('http://localhost:8000/signin', {
        email: data.email,
        password: data.password
      })
      .then(res => {
        console.log(res);
      })
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        {/* Card */}
        <Card className="smooth-shadow-md">
          {/* Card body */}
          <Card.Body className="p-6">
            <div className="mb-4">
              <Link href="/"><Image src="/images/brand/logo/logo-primary.svg" className="mb-2" alt="" /></Link>
              <p className="mb-6">Please enter your user information.</p>
            </div>
            {/* Form */}
            {hasMounted &&
              <Form onSubmit={handleSubmit(onSubmitFunc)}>
                {/* Username */}
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Enter your email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter address here"
                    required="Email empty!!!"
                    {...register('email')}
                  />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="**************"
                    required="Password empty!!!"
                    {...register('password')}
                  />
                </Form.Group>

                {/* Checkbox */}
                <div className="d-lg-flex justify-content-between align-items-center mb-4">
                  <Form.Check type="checkbox" id="rememberme">
                    <Form.Check.Input type="checkbox" />
                    <Form.Check.Label>Remember me</Form.Check.Label>
                  </Form.Check>
                </div>
                <div>
                  {/* Button */}

                  <div className="d-grid">
                    <Button variant="primary" type="submit">Sign In</Button>
                  </div>
                  
                  <div className="d-md-flex justify-content-between mt-4">
                    <div className="mb-2 mb-md-0">
                      <Link href="/authentication/sign-up" className="fs-5">Create An Account</Link>
                    </div>
                    <div>
                      <Link href="/authentication/forget-password" className="text-inherit fs-5">Forgot your password?</Link>
                    </div>
                  </div>
                </div>
              </Form>}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default SignIn;

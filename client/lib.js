"use server"
import axios from 'axios';
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function login(formData) {
  try {
    const response = await axios.post('http://localhost:8000/signin', {
      email: formData.email,
      password: formData.password
    })
    console.log(response.data);
    const user = response.data.data;
    const expires = new Date(Date.now() + 500 * 1000);
    const session = user;
    //console.log(session); 
    cookies().set("session", session, { expires, httpOnly: true });
  } catch (error) {
    console.error(error);
  }
};

export async function cookieInfo() {
  const session = cookies().get("session");
  const session_token = session.value;
  return session_token; 
}

export async function updateSession(request) {
  const session = request.cookies.get("session")?.value;
  if (!session) {
    return NextResponse.redirect(new URL("/authentication/sign-in", request.url));
  }
  // else {
  //   let expires = new Date(Date.now() + 120 * 1000);
  //   const res = NextResponse.next();
  //   res.cookies.set({
  //     name: "session",
  //     value: session,
  //     httpOnly: true,
  //     expires: expires,
  //   });
  //   return res;
  // }
}

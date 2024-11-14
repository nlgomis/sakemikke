import { NextResponse } from 'next/server'
 
export function middleware(request) {
  // Get the token from cookies or localStorage
  const token = request.cookies.get('token') || localStorage.getItem('token')
 
  // Check if the requested page is the profile page
  if (request.nextUrl.pathname.startsWith('/profile')) {
    if (!token) {
      // Redirect to login if there's no token
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
 
  return NextResponse.next()
}
 
export const config = {
  matcher: '/profile',
}
// app/api/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const cookieStore = cookies();
  
  // Clear the JWT cookie
  cookieStore.delete('session');

  // Get the base URL dynamically
  const baseUrl = new URL(request.url).origin;

  // Redirect to the login page using an absolute URL
  return NextResponse.redirect(`${baseUrl}/login`);

}
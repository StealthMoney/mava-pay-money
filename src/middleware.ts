import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateAuthHeader } from '@/services/auth/token';
import { PARTNER_QUERY } from './config/default';
import { PartnerRepository } from './services/prisma/repository/partner';
import { stringifyError } from './server/utils';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log("got to middleware")
  const validatedPartner = await validateAuthHeader(request)

  if (validatedPartner instanceof Error) {
    console.error(validatedPartner.message)
    return new Response(stringifyError(validatedPartner), {
      status: validatedPartner.status
    })
  }
  if (validatedPartner.isValid) {
    const url = new URL(request.url);
    const params = url.searchParams;

    if (validatedPartner.partner) {
      params.set(PARTNER_QUERY, validatedPartner.partner) 
    } else {
      params.delete(PARTNER_QUERY)
    }
    
    request.nextUrl.search = params.toString();
    return NextResponse.next(); 
  } else {
    return new Response("Unknown Authorization Error", {
      status: 401
    })
  }

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/lnurlpay/:path*',
}

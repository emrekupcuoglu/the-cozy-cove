import { MiddlewareConfig } from "next/server";

// export { auth as middleware } from "@/app/_lib/auth";

import { auth } from "@/app/_lib/auth";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

// export function middleware(request: NextRequest) {
//   console.log("request", request.cookies);

//   This will throw a too many redirects error because middleware is run on every route and when we redirect to /about it will run the middleware again and again. to avoid this we need a matcher
//   return NextResponse.redirect(new URL("/about", request.url));
// }

export const config: MiddlewareConfig = { matcher: ["/account"] };

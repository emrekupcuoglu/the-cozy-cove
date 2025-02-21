// This is a catchAll route. This means that any request to the api/auth/<whatever> will be handled by this route. This is useful for handling the authentication routes

// We import the NextAuth instance and the GET and POST handlers and immediately export them
export { GET, POST } from "@/app/_lib/auth";

// This can not be in a folder with a page.tsx inside because the server can only respond by sending and HTML or JSON. And if they are both in the same folder this causes a conflict.

// To define the request types we create function corresponding to the HTTP methods e.g. GET or POST

export function GET() {
  // the route handlers use the web standart request and response objects
  return Response.json({ test: "test" });
}

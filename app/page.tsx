import Link from "next/link";
import Image from "next/image";
import bg from "@/public/bg.png";

export default function Page() {
  return (
    <div className="mt-24">
      {/* When using the Image component with the fill prop, the parent element needs to be position:relative, fixed, or absolute. If we do not give it that property as in here than the image will fill the whole body tag, because Image will have a style of position: absolute  */}
      <Image
        src={bg}
        fill
        className="object-cover object-top"
        placeholder="blur"
        alt="Mountains and forests with two cabins"
      />
      {/* <img src="/bg.png" alt="Mountains and forests with two cabins" /> */}

      <div className="relative z-10 text-center">
        <h1 className="mb-10 text-8xl font-normal tracking-tight text-primary-50">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-lg font-semibold text-primary-800 transition-all hover:bg-accent-600"
        >
          Explore luxury cabins
        </Link>
      </div>
    </div>
  );

  // * Next.js Link component
  /* This works but when we navigate using the basic anchor tag we reload the whole page and it takes a long time. Instead we do not want to re-download the already downloaded javascript bundle which also includes React*/

  /* <a href="/cabins">Explore Luxury Cabins</a> */

  /* This is why Next.js provides a Link component */

  /* Link implements a few optimization techniques
      1. it pre-fetches all the routes that are linked to the current page. This only works in production mode.
      2. Each page is downloaded separately as a separate chunk which also improves performance
      3. Each page we visit will be cached in the browser so that we do not have to re-download the page again. 
       */

  /* We have added the Navigation to the RootLayout */

  /* <Navigation /> */
}

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

// It is important to optimize the images in the application, this is because images are the largest files in the application and can slow down the application. Next.js has a built in image component that can be used to optimize the images. This component will automatically optimize the images for the web using modern formats such as AVIF or WebP, and will lazy load the images, and will also automatically generate multiple sizes of the images for different screen sizes. It also prevents layout shifts because it forces us to specify the exact height and width. This will improve the performance of the application and will make the images load faster.

function Logo() {
  return (
    <Link href="/" className="z-10 flex items-center gap-4">
      {/* We can use the Image component in more than one way, if we use it like this we have to specify the height and width */}
      {/* <Image src="/logo.png" height="60" width="60" alt="The Cozy Cove logo" /> */}
      {/* If we first import the image than nextjs can analyze the image and we don't need to specify the height and width, but because the size is bigger than what we want we still specify the dimensions. When we statically import the image like this we can add other properties as well */}
      <Image
        height={60}
        width={60}
        src={logo}
        // quality={10}
        alt="The Cozy Cove logo"
      />
      <span className="text-xl font-semibold text-primary-100">
        The Cozy Cove
      </span>
    </Link>
  );
}

export default Logo;

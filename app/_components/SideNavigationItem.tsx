import Link from "next/link";

function SideNavigationItem({
  link,
  isActive,
  onClick,
}: {
  link: { name: string; href: string; icon: React.ReactNode };
  isActive: boolean;
  onClick: () => void;
}) {
  console.log("typeof window", typeof window);

  return (
    <li key={link.name}>
      <Link
        className={`flex items-center gap-4 px-5 py-3 font-semibold text-primary-200 transition-colors hover:bg-primary-900 hover:text-primary-100 ${isActive ? "bg-red-400 text-primary-100" : ""}`}
        href={link.href}
        onClick={onClick}
      >
        {link.icon}
        <span>{link.name}</span>
      </Link>
    </li>
  );
}

export default SideNavigationItem;

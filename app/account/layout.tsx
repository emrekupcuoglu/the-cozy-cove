import SideNavigation from "../_components/SideNavigation";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-full grid-cols-[14rem_1fr] gap-12">
      <SideNavigation />
      {children}
    </div>
  );
}

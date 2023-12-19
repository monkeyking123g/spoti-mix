import { title } from "@/components/primitives";
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="p-2">
        <h1 className={title()}>Genre</h1>
      </div>
      <section className="grid grid-cols-4 gap-4">{children}</section>
    </>
  );
}

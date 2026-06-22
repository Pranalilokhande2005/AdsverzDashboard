import Sidebar from "@/components/Sidebar";

export default function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "25px",
          overflowX: "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}
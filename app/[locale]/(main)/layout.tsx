import NavBarBig from "@/components/layout/NavBarBig";
import NavBarSmall from "@/components/layout/NavBarSmall";
import Footer from "@/components/layout/Footer";
import { LikesProvider } from "@/lib/context/likes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LikesProvider>
      <NavBarBig />
      <NavBarSmall />
      {children}
      <Footer />
    </LikesProvider>
  );
}

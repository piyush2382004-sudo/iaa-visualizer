import "./globals.css";
export const metadata = { title: "DSA Visualizer", description: "Data structures and algorithms, step by step" };
export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}

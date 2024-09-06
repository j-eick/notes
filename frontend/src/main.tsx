import { ReactNode, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Layout>
      <App />
    </Layout>
  </StrictMode>
);

type LayoutProps = {
  children: ReactNode;
};
function Layout({ children }: LayoutProps) {
  return <div>{children}</div>;
}

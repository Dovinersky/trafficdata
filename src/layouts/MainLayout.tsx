import Header from "@/components/Header";
import "@/styles/layouts/MainLayout.scss";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <main className="main-layout">
            <Header />
            <div className="content">{children}</div>
        </main>
    );
};

export default MainLayout;

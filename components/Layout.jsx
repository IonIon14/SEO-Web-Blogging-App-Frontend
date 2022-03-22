import Header from "./Header";
const Layout = ({ children }) => {
    return (
        <div className="">
            <Header />
            {children}
            <p>footer</p>
        </div>
    )
}

export default Layout;
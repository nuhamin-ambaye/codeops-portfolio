import Sidebar from "../Sidebar/Sidebar";
import "./Main.css";

function Main({ children }) {
    return (
        <div className="Main">
            <Sidebar />
            <div className="main-content">
                {children}
            </div>
        </div>
    );
}

export default Main;

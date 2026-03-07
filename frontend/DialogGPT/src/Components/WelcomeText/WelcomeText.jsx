import "./WelcomeText.css";
import Button from "../ButtonOrange/Button";
import { useNavigate } from "react-router-dom"; // Import the hook

export default function WelcomeText(props) {

    const navigate = useNavigate(); // Initialize navigation
    const goToNextPage = () => {
        navigate("/chat");
    };
    return (
        <div className="welcome-container">
            <div className="typewriter-wrapper">
                <div className="typewriter">
                    <h1>{props.text}</h1>
                </div>
                {/* The button is now nested so it can sit bottom-right of the text */}
                <Button onClick={goToNextPage}/>
            </div>
        </div>
    );
}
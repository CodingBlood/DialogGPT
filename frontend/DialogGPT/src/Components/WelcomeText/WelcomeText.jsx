import "./WelcomeText.css";
import Button from "../ButtonOrange/Button"; // Updated path to match your structure
import { useNavigate } from "react-router-dom";

export default function WelcomeText(props) {
    const navigate = useNavigate();

    const goToNextPage = () => {
        navigate(props.route);
    };

    return (
        <div className="welcome-container">
            <div className="typewriter-wrapper">
                <div className="tech-tag" style={{ marginBottom: '10px', opacity: 0.6 }}>
                    INITIALIZING_SESSION...
                </div>
                <div className="typewriter">
                    <h1>{props.text}</h1>
                </div>
                <Button onClick={goToNextPage} delay="1.8s" />
            </div>
        </div>
    );
}
import "./Welcome.css";
import Button from "../ButtonOrange/Button";

export default function Welcome(props) {
    return (
        <div className="welcome-container">
            <div className="typewriter-wrapper">
                <div className="typewriter">
                    <h1>{props.text}</h1>
                </div>
                {/* The button is now nested so it can sit bottom-right of the text */}
                <Button onClick={() => console.log("Navigating...")} />
            </div>
        </div>
    );
}
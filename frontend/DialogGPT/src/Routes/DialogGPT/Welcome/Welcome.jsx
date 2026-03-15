import WelcomeText from "../../../Components/WelcomeText/WelcomeText.jsx"
import "./Welcome.css" // Create this new file

export default function Welcome(){
    return (
    <div className="landing-page-full"> {/* New wrapper class */}
        <WelcomeText route="/DialogGPT/login" text="Welcome To DialogGPT !!" />
    </div>
  )
}
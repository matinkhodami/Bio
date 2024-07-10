import { useContext } from "react";
import { Theme , ToggleTheme } from '../App'
import './style/ThemeToggle.css'

export default function ThemeToggle() {
      const theme = useContext(Theme)
      const toggleTheme = useContext(ToggleTheme)

	return (
		<button
			data-testid="toggle"
			onClick={toggleTheme}
			className={`toggle ${!theme ? "toggle-light" : ""}`}>
			<div className="day">
				<div className="container">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
                              <span></span>
					<span></span>
					<span></span>
				</div>
			</div>
			<span className="icon">
				<div>
					<i className="fa-duotone fa-moon"></i>
				</div>
				<div>
					<i className="fa-solid fa-brightness"></i>
                              {/* <i class="fa-sharp fa-light fa-sun"></i> */}
                              {/* <i className="fa-sharp fa-solid fa-sun"></i> */}
				</div>
			</span>
			<div className="night">
				<div className="container">
					<span></span>
					<span></span>
					<span></span>
					<span className="star one">
						<i className="fa-solid fa-stars"></i>
					</span>
					<span className="star two">
						<i className="fa-solid fa-stars"></i>
					</span>
					<span className="star three">
						<i className="fa-solid fa-stars"></i>
					</span>
					<span className="star four">
						<i className="fa-solid fa-stars"></i>
					</span>
				</div>
			</div>
		</button>
	);
}

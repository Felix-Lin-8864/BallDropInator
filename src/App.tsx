import Game from "./Game";
import "./App.css";

const App: React.FC = () => {
  	return (
    	<div className="app">
     		<div id="header">
				<h1>BALL-DROP-INATOR</h1>
      		</div>
			<Game />
		</div>
  );
}

export default App

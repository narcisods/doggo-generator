import './App.css';
import Doglist from './components/Doglist';

const App = () => {
	return (
		<div className="App">
			<h1>Doggo Generator</h1>
			<h3>Click on a dog breed to meet one!</h3>
			<Doglist />
		</div>
	);
};

export default App;

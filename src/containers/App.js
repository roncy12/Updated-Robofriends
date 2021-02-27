import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
// import { robots } from './robot';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';

class App extends Component {
	constructor(){
		super()
		this.state = {
			robot: [],
			searchfield: ''
		}
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response=> response.json())
			.then(users => this.setState({robot: users}));
		}
	
	onSearchChange = (event) => {
		this.setState({searchfield: event.target.value})
		}

	render(){
		const {robot, searchfield} = this.state;

		const filteredRobots = robot.filter(robot=>{
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})
		return !robot.length ?
			<h1>Loading....</h1>:
			 (
				<div className='tc'>
					<h1 className="f1"> Robofriends </h1>
					<SearchBox searchChange={this.onSearchChange} />
					
					<Scroll>
					  <ErrorBoundry>
						<CardList robots = {filteredRobots} />
					  </ErrorBoundry>
					</Scroll>
				</div>
				);

		}
	
	

}

export default App;
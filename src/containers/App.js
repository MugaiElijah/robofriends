import React from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import { robots } from "../robots";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
import "../containers/App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: ""
    };
  }

  //fetching
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        res.json();
      })
      .then(users => {
        this.setState({
          robots: robots
        });
      });
  }

  onSearchChange = event => {
    this.setState({
      searchfield: event.target.value
    });
  };

  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });
    if (!robots.length) {
      return (
        <div className="tc">
          <h1 className="f1"> RoboFriends </h1> <h4> Loading </h4>{" "}
        </div>
      );
    } else {
      return (
        <div className="tc">
          <h1 className="f1"> RoboFriends </h1>{" "}
          <SearchBox searchChange={this.onSearchChange} />{" "}
          <Scroll>
            <ErrorBoundary>
              <CardList robots={filteredRobots} />
            </ErrorBoundary>
          </Scroll>
        </div>
      );
    }
  }
}

export default App;

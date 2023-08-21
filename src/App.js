import React, { Component } from 'react';   // react library
import './App.css';  // css styles


const list = [
  {
    title: "React",
    url: "https://facebook.github.io/react/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://github.com/reactjs/redux",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
]

const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {

  // gives us access to this.props
  // the contructor is only there to instantiate...
  // your class with all its properties
  constructor(props) {
    super(props);

    // internal component state
    this.state = {
      list,
      searchTerm: "",
    }

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);

  }

  onDismiss(id) {
    // filter out list items with ids that do not match...
    // the clicked item id.
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({list: updatedList})
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  render() {

    return (

      <div className="App">

        <form>
          <input type="text" 
          onChange={this.onSearchChange}/>
        </form>

        {this.state.list.filter(isSearched(this.state.searchTerm)).map(item =>
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>

            <span>
              <button onClick={() => this.onDismiss(item.objectID)} type='button'>
                Dismiss
              </button>
            </span>

          </div>
        )}

      </div>

    );

  }
}

export default App;
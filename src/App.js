import React, { Component } from 'react';   // react library
import './App.css';  // css styles

// building the url to access the API
const DEFAULT_QUERY = 'pg';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = '?query='

const url = `${PATH_BASE}${PATH_SEARCH}${PARAM_SEARCH}${DEFAULT_QUERY}`;

// outputting the url
console.log(url)


// const list = [
//   {
//     title: "React",
//     url: "https://facebook.github.io/react/",
//     author: "Jordan Walke",
//     num_comments: 3,
//     points: 4,
//     objectID: 0,
//   },
//   {
//     title: "Redux",
//     url: "https://github.com/reactjs/redux",
//     author: "Dan Abramov, Andrew Clark",
//     num_comments: 2,
//     points: 5,
//     objectID: 1,
//   },
// ]

const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {

  // gives us access to this.props
  // the contructor is only there to instantiate...
  // your class with all its properties
  constructor(props) {
    super(props);

    // internal component state
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    }

    // binding of class methods
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);

  }


  onDismiss(id) {
    // filter out list items with ids that do not match...
    // the clicked item id.
    const updatedHits = this.state.result.hits.filter(item => item.objectID !== id);
    // immutable date structures
    // we are not modifying the original result datastructure
    // but rather we are creating a new one by merging some portion
    // of the old with a new sets of hits
    // this will update the hits of the original result
    this.setState({ result: { ...this.state.result, hits: updatedHits } })
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  setSearchTopStories(result) {
    this.setState({ result });
  }

  fetchSearchTopStories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error)
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  componentDidMount() {
    // access the search term from the local component state.
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);

  }

  render() {
    // ES-6 destructuring
    const { result, searchTerm } = this.state;

    return (

      <div className="page">
        <div className="interactions">

          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >Search</Search>

        </div>

        {/* since this is the only component that depends on the
      results from the fetch api we can apply conditional rendering.
      and only render it when we have retrieved our results 
      from the api */}
        {result &&
          <Table
            list={result.hits}
            onDismiss={this.onDismiss} />
        }

      </div>

    );

  }
}

// functional stateless components have no local state or...
// lifecycle methods.

const Search = ({ value, onChange, onSubmit, children }) => {
  // you can do business logic here
  return (
    <form onSubmit={onSubmit}>
      {children} <input type="text"
        value={value}
        onChange={onChange} />
        <button type='submit'>
          {children}
        </button>
    </form>
  );
}



const Table = ({ list, onDismiss }) =>
  <div className='table'>
    {list.map(item =>
      <div key={item.objectID} className='table-row'>
        <span style={{ width: '40%' }}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={{ width: '30%' }}>{item.author}</span>
        <span style={{ width: '10%' }}>{item.num_comments}</span>
        <span style={{ width: '10%' }}>{item.points}</span>

        <span style={{ width: '10%' }}>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className='button-inline'>Dismiss</Button>
        </span>

      </div>
    )}
  </div>


const Button = ({ onClick, className = "", children }) =>
  <button onClick={onClick} className={className} type='button'>
    {children}
  </button>




export default App;
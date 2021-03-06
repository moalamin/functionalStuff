var React = require('react');
var Todo = require('./Todo');
var TodoForm = require('./TodoForm')

const todos = [];

var TodoList = React.createClass({
  getInitialState: function() {
    return {todos: todos};
  },
  changeTodoStatus (task) {
    var updatedTodos = this.state.todos.map(function(todo){
      if (task.task === todo.task) {
        return {task: todo.task, completed: !todo.completed};
      } else {
        return todo;
      }
    });
    this.setState({todos: updatedTodos});
  },
  clearAllButton() {
    if( !(this.state.todos.length === 0) ){
      return(<button className="btn btn-danger pull-xs-right" style={{marginTop: "10px"}} onClick={this.clearAll}>Clear All</button>)
    }
  },
  clearAll() {
    this.setState({todos: []});
  },
  addTodo: function(todo) {
    var newState = this.state.todos.slice(0)
    newState.push({task: todo, completed: false});
    this.setState({todos: newState});
  },
  render: function() {
    return(
      <div className="container">
        <div className="col-xs-8 offset-xs-2">
          <div className="row">
            <TodoForm addTodo={this.addTodo}/>
          </div>
          <div className="row list-of-things">
            { 
              this.state.todos.length === 0 ?
                <h1> Enter a task to start your list! </h1>
              :
                <ul className="list-group">
                  {
                    this.state.todos.map( (todo, index) => {
                      return (<Todo clickHandler={ this.changeTodoStatus } key={index} todo={todo} />);
                    })
                  }
                </ul> 
              }
          </div>
          { this.clearAllButton() }
        </div>
      </div>
    );
  }
});

module.exports = TodoList;

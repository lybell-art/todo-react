import { useState } from "react";
import TodoInsertForm from "./components/TodoInsertForm.jsx";
import TodoFilter from "./components/TodoFilter.jsx";
import TodoList from "./components/TodoList.jsx";
import "./App.css";

function App() {
	const [todoData, setTodoData] = useState([]);
	const [filter, setFilter] = useState("all");

	const filteredList = todoData.filter(({completed})=>{
		if(filter === "completed") return completed;
		if(filter === "incompleted") return !completed;
		return true;
	});
	const addItem = (value)=>{
		setTodoData( data=>[...data, {value, completed: false, id: Math.random()}] );
	};
	const updateItem = (detail)=>{
		setTodoData( data=>data.map( (item)=>{
			if(item.id === detail.id) return {...item, ...detail};
			return item;
		} ) );
	};
	const removeItem = (id)=>{
		setTodoData( data=>data.filter( ({id})=>id !== +detail ) );
	};

	return (
		<>
			<TodoInsertForm onSubmit={ addItem } />
			<div>
				<TodoFilter filter={filter} onChange={ setFilter }/>
				<TodoList data={ filteredList } updateItem={updateItem} removeItem={removeItem} />
			</div>
		</>
	)
}

export default App;

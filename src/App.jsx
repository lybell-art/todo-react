import { useState, useEffect } from "react";
import TodoInsertForm from "./components/TodoInsertForm.jsx";
import TodoFilter from "./components/TodoFilter.jsx";
import TodoList from "./components/TodoList.jsx";
import "./App.css";

function App({store}) {
	const [todoData, setTodoData] = useState([]);
	const [filter, setFilter] = useState("all");
	const [loaded, setLoaded] = useState(false);

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
	const removeItem = (detail)=>{
		setTodoData( data=>data.filter( ({id})=>id !== +detail ) );
	};

	useEffect( ()=>{
		if(store === undefined) return;
		setTodoData(store.loadItem());
		setLoaded(true);
	}, [] );

	useEffect( ()=>{
		if(store === undefined || !loaded) return;
		store.saveItem(todoData);
	}, [todoData, loaded] );

	return (
		<>
			<TodoInsertForm onSubmit={ addItem } />
			<div className="todo-body">
				<TodoFilter filter={filter} onChange={ setFilter }/>
				<TodoList data={ filteredList } updateItem={updateItem} removeItem={removeItem} />
			</div>
		</>
	)
}

export default App;

import TodoItem from "./TodoItem.jsx";
import style from "./TodoList.module.css";

export default function TodoList({data, updateItem, removeItem})
{
	return <div className={style.container}>
		{data.map( (item)=>{
			return <TodoItem 
				data={item} 
				updateItem={updateItem} 
				removeItem={removeItem} 
				key={item.id}
			/>
		} )}
	</div>
}
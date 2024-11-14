import style from "./TodoFilter.module.css";

const options = [
	{value: "all", text: "전체"},
	{value: "completed", text: "완료"},
	{value: "incompleted", text: "미완료"}
];

export default function TodoFilter({filter, onChange})
{
	return <div className={style.container}>
		{options.map( ({value, text})=>{
			return <button 
				type="button" 
				className={`todo-button ${style.button} ${filter === value ? style.selected : ""}`}
				onClick={()=>onChange(value)}
				key={value}
			>
				{text}
			</button>
		} )}
	</div>
}
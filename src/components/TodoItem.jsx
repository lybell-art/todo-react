import style from "./TodoItem.module.css";

export default function TodoItem({data, updateItem, removeItem})
{
	return <div className={style.container}>
		<label className={style.label}>
			<input 
				type="checkbox" 
				className={style.checkbox} 
				aria-label="완료 여부" 
				checked={data.completed} 
				onChange={(e)=>updateItem({...data, completed: e.target.checked})} 
			/>
			<p className={style.detail}>{data.value}</p>
		</label>
		<button type="button" className={style.deleteButton} onClick={()=>removeItem(data.id)}>삭제</button>
	</div>
}
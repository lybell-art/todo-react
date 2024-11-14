import {useRef} from "react";
import style from "./TodoInsertForm.module.css";

export default function TodoInsertForm({onSubmit})
{
	const inputRef = useRef(null);
	return <form className={style.container} onSubmit={ (e)=>{
		e.preventDefault();
		onSubmit(inputRef.current.value);
		inputRef.current.value = "";
	} }>
		<label className={style.label}>
			<p>할일 입력</p>
			<input className={style.input} type="text" placeholder="할일을 입력하세요." required ref={inputRef} />
		</label>
		<button className={style.submitButton}>추가</button>
	</form>
}
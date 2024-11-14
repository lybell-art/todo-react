import Storage from "./storage.js";

const SAVE_KEY = "todo-react-data";
export default class LocalStorageStore extends Storage
{
	loadItem()
	{
		try {
			const save = localStorage.getItem(SAVE_KEY);
			return JSON.parse(save) ?? [];
		}
		catch {
			localStorage.deleteItem(SAVE_KEY);
			return [];
		}
	}
	saveItem(value)
	{
		localStorage.setItem(SAVE_KEY, JSON.stringify(value));
	}
	clearItem()
	{
		localStorage.deleteItem(SAVE_KEY);
	}
}
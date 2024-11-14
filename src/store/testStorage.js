import Storage from "./storage.js";

export default class TestStorage extends Storage
{
	#data = [];
	constructor(initialData)
	{
		super();
		this.#data = initialData;
	}
	loadItem()
	{
		return this.#data;
	}
	saveItem(value)
	{
		this.#data = value;
	}
	clearItem()
	{
		this.#data = [];
	}
}
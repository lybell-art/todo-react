import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import App from "../App.jsx";
import TestStorage from "../store/testStorage.js";

describe("입력 유효성 테스트", ()=>{
	test("새로운 할 일을 추가할 수 있는가?", async ()=>{
		const { getByText, getByRole } = render(<App />);

		const input = getByRole("textbox", {name: "inputTodo"});
		const button = getByRole("button", {name: "추가"});
		await input.fill("example");
		await button.click();

		await expect.element(getByText("example")).toBeInTheDocument();
	});

	// test("빈 입력을 추가할 수 없는가?", async ()=>{
	// 	const { getByText, getByRole } = render(<App />);

	// 	const input = getByRole("textbox", {name: "inputTodo"});
	// 	const button = getByRole("button", {name: "추가"});
	// 	await button.click();

	// 	await expect.element(getByText("example")).toBeInTheDocument();
	// });
});

describe("토글 테스트", ()=>{
	test("토글을 클릭할 수 있는가?", async ()=>{
		const testData = new TestStorage([{id:0.1234, value: "hello", completed: false}]);

		const { getByText } = render(<App store={testData}/>);

		const item = getByText("hello");
		const checkbox = item.locator("..").getByRole("checkbox");

		await checkbox.click();
		//console.log(checkbox);
		//await expect(checkbox).toBeChecked();
	});
	test("토글을 다시 클릭해서 원 상태로 복귀할 수 있는가?", async ()=>{
		const testData = new TestStorage([{id:0.1234, value: "hello", completed: false}]);

		const { getByText } = render(<App store={testData}/>);

		const item = getByText("hello");
		const checkbox = item.locator("..").getByRole("checkbox");

		await checkbox.click();
		await checkbox.click();

		//await expect(checkbox).not().toBeChecked();
	});
});
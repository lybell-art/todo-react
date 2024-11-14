import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import App from "../App.jsx";
import TestStorage from "../store/testStorage.js";

describe("todo 추가 테스트", ()=>{
	test("새로운 할 일을 추가할 수 있는가?", async ()=>{
		const { getByText, getByRole } = render(<App />);

		const input = getByRole("textbox", {name: "inputTodo"});
		const button = getByRole("button", {name: "추가"});
		await input.fill("example");
		await button.click();

		await expect.element(getByText("example")).toBeInTheDocument();
	});

	test("빈 입력을 추가할 수 없는가?", async ()=>{
		const { getByText, getByRole } = render(<App />);

		const input = getByRole("textbox", {name: "inputTodo"});
		const button = getByRole("button", {name: "추가"});

		await expect.element(button).toHaveStyle({backgroundColor: "#6d6e72"});
	});
});

describe("todo 완료처리 테스트", ()=>{
	test("토글을 클릭할 수 있는가?", async ()=>{
		const testData = new TestStorage([{id:0.1234, value: "hello", completed: false}]);

		const { getByText } = render(<App store={testData}/>);

		const item = getByText("hello");
		const checkbox = item.locator("..").getByRole("checkbox");

		await checkbox.click();
		await expect.element(checkbox).toBeChecked();
	});
	test("토글을 다시 클릭해서 원 상태로 복귀할 수 있는가?", async ()=>{
		const testData = new TestStorage([{id:0.1234, value: "hello", completed: false}]);

		const { getByText } = render(<App store={testData}/>);

		const item = getByText("hello");
		const checkbox = item.locator("..").getByRole("checkbox");

		await checkbox.click();
		await checkbox.click();

		await expect.element(checkbox).not.toBeChecked();
	});
});

describe("todo 삭제 테스트", ()=>{
	test("todo를 삭제할 수 있는가?", async ()=>{
		const testData = new TestStorage([{id:0.1234, value: "hello", completed: false}]);

		const { getByText } = render(<App store={testData}/>);

		const item = getByText("hello");
		const button = item.locator("../..").getByRole("button");


		await button.click();
		await expect.element(item).not.toBeInTheDocument();
	});
	test("중간에 있는 todo가 삭제되었을 때, 정렬이 유지되는가?", async ()=>{
		const testData = new TestStorage([
			{id:0.1234, value: "hello", completed: true},
			{id:0.3456, value: "world", completed: true},
			{id:0.7890, value: "lg", completed: false},
		]);

		const { getByText } = render(<App store={testData}/>);

		const item = getByText("world");
		const button = item.locator("../..").getByRole("button");

		await button.click();


		const helloTodo = getByText("hello").locator("../..");
		const actualNextTodo = helloTodo.locator('xpath=following-sibling::*[1]').getByText("lg");

		await expect.element(actualNextTodo).toBeInTheDocument();
	});
});

describe("todo 필터링 테스트", ()=>{
	test("필터링 옵션을 완료로 선택했을 때, 해당 todo만 보여지는가?", async ()=>{
		const testData = new TestStorage([
			{id:0.1234, value: "hello", completed: true},
			{id:0.3456, value: "world", completed: true},
			{id:0.7890, value: "lg", completed: false},
		]);

		const { getByText } = render(<App store={testData}/>);

		const compButton = getByText(/^완료$/i);

		await compButton.click();

		await expect.element(getByText("world")).toBeInTheDocument();
		await expect.element(getByText("lg")).not.toBeInTheDocument();
	});
	test("필터링 옵션을 미완료로 선택했을 때, 해당 todo만 보여지는가?", async ()=>{
		const testData = new TestStorage([
			{id:0.1234, value: "hello", completed: true},
			{id:0.3456, value: "world", completed: true},
			{id:0.7890, value: "lg", completed: false},
		]);

		const { getByText } = render(<App store={testData}/>);

		const compButton = getByText(/^미완료$/i);

		await compButton.click();

		await expect.element(getByText("world")).not.toBeInTheDocument();
		await expect.element(getByText("lg")).toBeInTheDocument();
	});
});

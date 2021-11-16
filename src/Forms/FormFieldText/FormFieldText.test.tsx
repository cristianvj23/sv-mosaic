import { render, screen, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { useState } from 'react';
import TextField from './FormFieldText';

describe('Text field component', () => {
	beforeEach(() => {
		render(
			<TextField
				label='Label test'
				instructionText='Instructional text'
				placeholder='placeholder'
				onChange={() => jest.fn()}
			/>
		);
	});

	it('should should display text field component', () => {
		const labelElement = screen.getByText('Label test');
		expect(labelElement).toBeDefined();
	});

	it('should should display the instructional text', () => {
		const instructionTextElement = screen.getByText('Instructional text');
		expect(instructionTextElement).toBeDefined();
	});

	it('should should display the placeholder', () => {
		const placeholderElement = screen.getByPlaceholderText('placeholder');
		expect(placeholderElement).toBeDefined();
	});
});

describe('The behaviour of the error text and the helper text', () => {
	it('should, in case of an error, display the error text and not the helper text', () => {
		render(
			<TextField
				label='Label test'
				error={'Error text'}
				helperText='Helper text'
				placeholder='placeholder'
				onChange={() => jest.fn()}
			/>
		);
		const errorTextElement = screen.getByText('Error text');
		const helperText = screen.queryByText('Helper text');

		expect(errorTextElement).toBeDefined();
		expect(helperText).toBe(null);
	});

	it('should should display the helper text in the case of no error', () => {
		render(
			<TextField
				label='Label test'
				helperText='Helper text'
				placeholder='placeholder'
				onChange={() => jest.fn()}
			/>
		);
		const helperTextElement = screen.getByText('Helper text');
		const errorTextElement = screen.queryByText('Error text');

		expect(helperTextElement).toBeDefined();
		expect(errorTextElement).toBe(null);
	});
});

describe('The multiline behaviour', () => {
	it('should render an input element when multiline is off', () => {
		render(
			<TextField
				inputSettings={{
					htmlFor: 'input-test',
					placeholder: 'placeholder',
					multiline: false
				}}
				onChange={() => jest.fn()}
				id='input-test'
				label='Label test'
			/>
		);
		const inputElement = screen.getByLabelText('Label test');

		expect(inputElement).toBeDefined();
		expect(inputElement.nodeName).toBe('INPUT');
	});

	it('should a text area element when multiline is on', () => {
		render(
			<TextField
				inputSettings={{
					htmlFor: 'multiline-tes',
					placeholder: 'placeholder',
					multiline: true,
				}}
				id='multiline-test'
				label='Label test'
				onChange={() => jest.fn()}
			/>
		);
		const textAreaElement = screen.getByLabelText('Label test');

		expect(textAreaElement).toBeDefined();
		expect(textAreaElement.nodeName).toBe('TEXTAREA');
	});
});

describe('The char counter behaviour', () => {
	it('should render the char counter', () => {
		const WithCharCounter = () => {
			const [inputValue, setInputValue] = useState('');
			const onHandleChange = (event) => {
				setInputValue(event.target.value);
			};

			return (
				<TextField
					inputSettings={{
						htmlFor: 'char-test',
						placeholder: 'placeholder',
						maxCharacters: 20,
						value: inputValue,
					}}
					id='char-test'
					label='Label'
					onChange={onHandleChange}
				/>
			);
		};

		render(<WithCharCounter />);
		const inputElement = screen.getByLabelText('Label');

		fireEvent.change(inputElement, { target: { value: '233' } });
		const charCounter = screen.getByText('3/20');

		expect(charCounter).toBeDefined();
	});
});

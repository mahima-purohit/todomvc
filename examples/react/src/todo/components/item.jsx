import { memo, useState, useCallback, useEffect } from "react";
import classnames from "classnames";

import { Input } from "./input";

import { TOGGLE_ITEM, REMOVE_ITEM, UPDATE_ITEM } from "../constants";

export const Item = memo(function Item({ todo, dispatch, index }) {
	const [isWritable, setIsWritable] = useState(false);

	/**
	 * Task-1 Step-1: We used he useState hook to manage the color state of the todo item label and set it to "red" initially
	 */
	const [color, setColor] = useState("red");
	const { title, completed, id } = todo;
	/**
	 * Task-1 Step-2:
	 *  i) Used the useEffect hook to trigger actions when the component mounts or when the title of the todo item changes.
	 *  ii) Calculated the total no of increments needed to chnage the color gradually over 15 seconds
	 *  iii)Inside the useEffect hook, we set up an interval that triggers every 100 milliseconds.
	 *  iv) For each interval tick, we calculated the new color value based on the current increment, ensuring a smooth transition from red to black over the specified duration.
	 *  v)Cleaned up the interval when the component unmounts or when the title of the todo item changes.
	 *
	 */

	useEffect(() => {
		setColor("red");
		const totalTime = 15000; // 15 seconds
		const incrementDuration = 100; // Change color every 100 milliseconds
		const totalIncrements = totalTime / incrementDuration;
		let currentIncrement = 0;

		const interval = setInterval(() => {
			currentIncrement++;
			if (currentIncrement >= totalIncrements) {
				clearInterval(interval);
			}

			const redValue = 255 - (255 / totalIncrements) * currentIncrement;
			const greenValue = 0;
			const blueValue = 0;
			setColor(`rgb(${redValue}, ${greenValue}, ${blueValue})`);
		}, incrementDuration);

		return () => {
			clearInterval(interval);
		};
	}, [title]);

	const toggleItem = useCallback(
		() => dispatch({ type: TOGGLE_ITEM, payload: { id } }),
		[dispatch]
	);
	const removeItem = useCallback(
		() => dispatch({ type: REMOVE_ITEM, payload: { id } }),
		[dispatch]
	);
	const updateItem = useCallback(
		(id, title) => dispatch({ type: UPDATE_ITEM, payload: { id, title } }),
		[dispatch]
	);

	const handleDoubleClick = useCallback(() => {
		setIsWritable(true);
	}, []);

	const handleBlur = useCallback(() => {
		setIsWritable(false);
	}, []);

	const handleUpdate = useCallback(
		(title) => {
			if (title.length === 0) removeItem(id);
			else updateItem(id, title);

			setIsWritable(false);
		},
		[id, removeItem, updateItem]
	);

	return (
		<li
			className={classnames({
				completed: todo.completed,
			})}
			data-testid="todo-item"
		>
			<div className="view">
				{isWritable ? (
					<Input
						onSubmit={handleUpdate}
						label="Edit Todo Input"
						defaultValue={title}
						onBlur={handleBlur}
					/>
				) : (
					<>
						<input
							className="toggle"
							type="checkbox"
							data-testid="todo-item-toggle"
							checked={completed}
							onChange={toggleItem}
						/>
						<label
							//Task-1 Step-3: Rendered the todo item label with the dynamic color style.
							style={{ color: color }}
							data-testid="todo-item-label"
							onDoubleClick={handleDoubleClick}
						>
							{title}
						</label>
						<button
							className="destroy"
							data-testid="todo-item-button"
							onClick={removeItem}
						/>
					</>
				)}
			</div>
		</li>
	);
});

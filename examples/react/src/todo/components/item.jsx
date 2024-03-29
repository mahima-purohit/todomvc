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
	/**
	 * **************************TASK-2, STEP-3*********************
	 * Extract the checkedColor property form the todo object and apply it on label
	 */
	/**
	 * **************************TASK-2, STEP-4*********************
	 * Extract the addedTime and completedTime properties form the todo object and apply it on label
	 */
	const { title, completed, id, checkedColor, addedTime, completedTime } = todo;
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
	//TASK-2
	const toggleItem = useCallback(
		() => dispatch({ type: TOGGLE_ITEM, payload: { id } }),
		[dispatch, id]
	);
	const removeItem = useCallback(
		() => dispatch({ type: REMOVE_ITEM, payload: { id } }),
		[dispatch, id]
	);
	const updateItem = useCallback(
		(id, title) => dispatch({ type: UPDATE_ITEM, payload: { id, title } }),
		[dispatch, id]
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
					<div
						style={{
							display: "flex",
							// justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<input
							className="toggle"
							type="checkbox"
							data-testid="todo-item-toggle"
							checked={completed}
							onChange={toggleItem}
						/>
						<label
							/**
                         * ******************TASK-1, STEP-3:*************************
                            Rendered the todo item label with the dynamic color style.
                         * ******************TASK-2, STEP-4:*************************
                         * Change the label styling based on it's status of completion
                         * ******************TASK-3, STEP-5:*************************
                         * Add the two columns and render the time stamps ", "addedTime" 
                         * and completedTime"
                         */
							// style={{ color: color }}
							style={{ color: completed ? checkedColor : color }}
							data-testid="todo-item-label"
							onDoubleClick={handleDoubleClick}
						>
							{title}
						</label>
						<span
							className="added-time"
							style={{ marginLeft: "30px", fontSize: 12 }}
						>
							{addedTime}
						</span>
						<span
							className="completed-time"
							style={{ fontSize: 12, marginLeft: "30px" }}
						>
							{completed ? completedTime : ""}
							{/* hello */}
						</span>
						<button
							className="destroy"
							data-testid="todo-item-button"
							onClick={removeItem}
						/>
					</div>
				)}
			</div>
		</li>
	);
});

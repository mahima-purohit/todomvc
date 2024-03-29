/** ***********************************TASK-3, STEP-1**********************
 * Wrote a utility function for handling the time relaed operations.
 * @function updateTimesOfCheckedTodo(state) is a utility function to handle time-related operation(completedTime and addedTime )
 * of each todo itme based on its completion status and wheteher the "addedTime" is already set.
 *  
 * @param {*} state , takes an array of todo items (state) as input
 * @returns a new array with updated time information for each todo item.
 */
export function updateTimesOfCheckedTodo(state) {
    return state.map((todo, index) => {
        if (todo.completed) {
            const completionDate = new Date().toLocaleDateString(); // Get the completion date
            const completionTime = new Date().toLocaleTimeString(); // Get the completion time
            todo.completedTime = `${completionDate} ${completionTime}`; // Combine date and time
        } else {
            todo.completedTime = ""; // Reset completion time if not completed
        }

        todo.addedTime = todo.addedTime || new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(); // Set the added time if not already set

        return todo;
    });
}



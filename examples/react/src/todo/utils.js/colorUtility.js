
/**
 * ******************TASK-2 STEP-1:*********************************
 * Created a utility function which iterate over the completed tasks
 * , determine their completion order and assign color accordingly.
 * @param {*} state : Current state
 * @returns new state with updated color information for completed tasks. The information is a new 
 * property called "checkedColor"
 */

export function updateColorsOfCheckedTodo(state) {
    return state.map((todo, index) => {
        if (todo.completed) {
            if (todo.completionOrder === 1) {
                todo.checkedColor = "green";
            }
            else if (todo.completionOrder === 2) {
                todo.checkedColor = "magenta";
            }
            else if (todo.completionOrder === 3) {
                todo.checkedColor = "yellow";
            }
            else {
                todo.checkedColor = "grey";
            }
        }
        return todo;
    })
}
//Task-3



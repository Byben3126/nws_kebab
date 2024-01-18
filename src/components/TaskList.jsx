import Task from "./Task";

function TaskList({ tasks , formConfig, recipes}) {    
    return (
        <div>
            {tasks.get.map(task => (
                <Task tasks={tasks} task={task} recipes={recipes}/>
            ))}
        </div>
    );
}

export default TaskList;
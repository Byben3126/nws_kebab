import { useState } from "react";
import RecipeForm from "./RecipeForm";
import RecipeList from "./RecipeList";



import TaskList from "./TaskList";

function App() {
    let [getRecipes, setRecipes] = useState([
        {
            id: 1,
            name: "Americain",
            content: "Le kebab du moment",
            tags: ["patates", "carottes"],
        
        },
        {
            id: 2,
            name: "Wooper",
            content: "Le burger du moment",
            tags: ["Pain", "Boeuf", "Salde"],
        
        },
        
    ]);

    let [getTasks, setTasks] = useState([
       
    ]);

    let [getFormConfig, setFormConfig] = useState({
        display: false,
        taskId: undefined,
    });

    let recipes = { get: getRecipes, set: setRecipes };
    let tasks = { get: getTasks, set: setTasks };

    let formConfig = { get: getFormConfig, set: setFormConfig };


    return (
        <>
            <div className="max-w-4xl my-4 mx-auto">
                <header className="flex justify-between items-center mb-4">
                    <h2 className="text-4xl">Recettes</h2>
                    <button onClick={() => formConfig.set({...formConfig.get, display: !formConfig.get.display,recipeId: undefined})} className="bg-blue-500 text-white text-xl rounded-md flex items-center justify-center w-14 h-9 ease-in-out duration-200 hover:bg-blue-600">
                        {formConfig.get.display ? (<i className="fa-solid fa-minus"></i>) : (<i className="fa-solid fa-plus"></i>)}
                    </button>
                </header>
                <div>
                    <RecipeForm recipes={recipes} formConfig={formConfig}/>
                    <RecipeList recipes={recipes} formConfig={formConfig} tasks={tasks}/>
                </div>
            </div>


            <div className="max-w-4xl my-4 mx-auto">
                <header className="flex justify-between items-center mb-4">
                    <h2 className="text-4xl">Taches</h2>  
                </header>
                <div>
                    <TaskList tasks={tasks} formConfig={formConfig} recipes={recipes}/>
                </div>
            </div>
           
        </>
    );
}

export default App;


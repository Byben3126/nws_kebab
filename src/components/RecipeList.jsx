import Recipe from "./Recipe";

function RecipeList({ recipes , formConfig, tasks}) {    
    return (
        <div>
            {recipes.get.map(recipe => (
                <Recipe recipes={recipes} recipe={recipe} formConfig={formConfig} tasks={tasks}/>
            ))}
        </div>
    );
}

export default RecipeList;
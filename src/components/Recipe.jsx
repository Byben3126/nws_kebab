import { useState } from "react"

function Recipe({ recipes, recipe , formConfig , tasks }) {
    let [getSauce, setSauce] = useState('none')
    
    const goCooking = async () => {
        if (getSauce !== 'none') {

            try {
                const response  = await fetch('https://worldtimeapi.org/api/timezone/Europe/paris');
                console.log(response )

                if (response.ok) {
                    const dataDate = await response.json();
                    console.log(dataDate)
                    tasks.set([...tasks.get,{
                        idRecipe: recipe.id,
                        id : (new Date(dataDate.datetime)).getTime(),
                        sauce : getSauce
                    }])
                 
                    setSauce('none')
                }
            } catch (error) {
                console.error('Erreur lors de la récupération de la date:', error.message);
            }
        }
       
    }

    const remove = () => {       
        recipes.set(recipes.get.filter(r => r.id !== recipe.id));
        tasks.set(tasks.get.filter(t => t.idRecipe !== recipe.id));
    }

    const edit = (index) => {
        formConfig.set({
            ...formConfig.get,
            display: true,
            recipeId: recipe.id,
        })
    }

    return (

     
        <details className="mb-2 bg-gray-100 rounded-md recipe">
            <summary className="flex py-2 px-6 h-12 items-center">
                <div className="mr-3 w-4 flex justify-center items-center cursor-pointer" id="open"><i className="duration-200 fa-regular fa-chevron-right "></i></div>
                <p className="text-base font-semibold">{recipe.name}</p>
                
                <div className="flex grow justify-end max">
                   
                    <select name="selectedSauce" value={getSauce} multiple={false} onChange={e => setSauce(e.target.value)}>
                        <option value="none">Choix de la sauce</option>
                        <option value="mayo">Mayonnaise</option>
                        <option value="ketchup">Ketchup</option>
                        <option value="mustard">Moutarde</option>
                        <option value="garlic">Sauce à l'ail</option>
                        <option value="tzatziki">Tzatziki</option>
                        <option value="bbq">Sauce barbecue</option>
                    </select>
                    
                </div>

                <div className="flex buttons items-center">
                    <button onClick={goCooking} className="pl-8 w-12 text-lg" id="goCooking">
                        <i class="fa-solid fa-hat-chef"></i>
                    </button>
                    <button onClick={edit}className="pl-8" id="edit"><i className="fa-solid fa-pen"></i></button>
                    <button onClick={remove} className="pl-8" id="remove"><i className="fa-solid fa-trash"></i></button>
                </div>
            </summary>
            <div className="content p-6 pt-1">
                <p className="mb-2">{recipe.content}</p>

               { recipe.content !== "" && recipe.tags.length > 0 && (<hr className="my-2" />)}

              
                <div className="tags flex flex-wrap">
                    {recipe.tags.map((tag, index) => (
                        <p className="mr-2 px-1.5 text-gray-50 text-xs bg-gray-400 rounded-sm leading-6 font-semibold mt-2">{tag}</p>
                    ))}
                </div>
               

            </div>
        </details>
    );
}

export default Recipe;



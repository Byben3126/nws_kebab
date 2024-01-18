import { useEffect, useState } from "react";

function Task({ tasks, task , recipes}) {
    const [timeFormat, setTimeFormat] = useState(0);

    const remove = () => {       
        tasks.set(tasks.get.filter(t => t.id !== task.id));
    }

    const recipe = recipes.get.find(r => r.id == task.idRecipe);

    
    useEffect(() => {
        const intervalId = setInterval(() => {
          
          const currentTime = new Date().getTime();
          const timeDifference = (currentTime - task.id)/ (1000 * 60);
          console.log(task)
          setTimeFormat(Math.floor(timeDifference).toString().padStart(2, '0')+ 'm'+ Math.floor(60 * (timeDifference - Math.floor(timeDifference))).toString().padStart(2, '0'));
        }, 1000);
    
        return () => clearInterval(intervalId);
    }, [task.id]);

    return (
       
     
        <details className="mb-2 bg-gray-100 rounded-md task">
            <summary className="flex py-2 px-6 h-12 items-center">
                <div className="mr-3 w-4 flex justify-center items-center cursor-pointer" id="open"><i className="duration-200 fa-regular fa-chevron-right "></i></div>
                <p className="text-base font-semibold">{recipe.name}</p>
                
                <div className="flex grow justify-end max">
                    <p className="ml-2 px-1.5 text-gray-50 text-xs bg-gray-400 rounded-sm leading-6 font-semibold">{timeFormat}</p>
                    <p className="ml-2 px-1.5 text-gray-50 text-xs bg-gray-400 rounded-sm leading-6 font-semibold">{task.sauce}</p>
               
                </div>

                <div className="flex buttons items-center">
                    <button onClick={remove} className="pl-8 w-12 text-lg" id="done">
                       <i className="fa-solid fa-check"></i>
                    </button>
           
                </div>
            </summary>
            <div className="content p-6 pt-1">
                <p className="mb-2">{recipe.content}</p>

               { recipe.content !== "" && recipe.tags.length > 0 && (<hr className="my-2" />)}

               { recipe.tags.length > 0 && (
                    <div className="tags flex flex-wrap">
                        {recipe.tags.map((tag, index) => (
                            <p className="mr-2 px-1.5 text-gray-50 text-xs bg-gray-400 rounded-sm leading-6 font-semibold mt-2">{tag}</p>
                        ))}
                    </div>
               )} 

            </div>
        </details>
    );
}

export default Task;



import { useEffect, useRef, useState } from "react";

function RecipeForm({ recipes, formConfig }) {
 
    

    let [idRecipe,  setIdRecipe ] = useState("");
    let [name,    setName   ] = useState("");
    let [content, setContent] = useState("");
    let [tags,    setTags   ] = useState([]);


    useEffect(() => {
        let recipe = formConfig.get.recipeId != undefined ? recipes.get.filter(recipe => recipe.id === formConfig.get.recipeId)[0] : {};
        setIdRecipe(formConfig.get.recipeId)
        setName(recipe.name    != undefined ? recipe.name    : "")
        setContent(recipe.content != undefined ? recipe.content : "")
        setTags(recipe.tags    != undefined ? recipe.tags    : [])

    },[formConfig.get.recipeId])

    const form = useRef()
    
    const deleteTag = (index) => {
        setTags(tags.filter((t, i) => i !== index));
    }

    const editTag = (index, value) => {
        if (value.length > 0) {
            let newTags = [...tags];
            newTags[index] = value;
            setTags(newTags);

        } else {
            deleteTag(index);
        }
    }

    const addTag = (value) => {
       if (value.length > 0) {
            let newTags = [...tags];
            newTags.push(value);
            setTags(newTags);
        }
    }

    const addRecipe = () => {
        console.log("form =>" , form.current)
        if (name === "") return;
        
        if (formConfig.get.recipeId !== undefined) {
            recipes.set(
                recipes.get.map(t => t.id == formConfig.get.recipeId ? {...t, name, content, tags } : t)
            )
      
            formConfig.set({
                ...formConfig.get,
                display: false,
                recipeId: undefined,
            })

        } else {
            recipes.set([
                ...recipes.get,
                {
                    id: new Date().getTime(),
                    name,
                    content,
                    tags,
                },
            ])
        }
        
        
        setName("");
        setContent("");
        setTags([]);
        
    }

    return (
        <form ref={form} className="bg-gray-100 rounded-md p-6 mb-4" style={{display : formConfig.get.display == false ? "none" : ""}}>
            <label className="block capitalize text-base font-semibold mb-1">Nom</label>
            <input onChange={(e) => setName(e.target.value)}  className="block rounded w-full h-9 mb-3 p-2" value={name} required></input>

            <label className="block capitalize text-base font-semibold mb-1">Contenu</label>
            <textarea onChange={(e) => setContent(e.target.value)} className="block rounded w-full h-40 mb-5 p-2" value={content}></textarea>

            <label className="block capitalize text-base font-semibold mb-1">Tags</label>
            <div className="tags flex flex-wrap mb-6">
                {tags.map((tag, index) => (
                    <div key={index} className="flex text-gray-50 text-xs bg-gray-400 rounded-sm leading-6 font-semibold h-6 mb-2 mr-2 ">
                        <span
                            onKeyPress={(e) => {
                                if(e.code == "Enter") {
                                    e.target.blur();
                                    editTag(index, e.target.textContent)
                                }
                            }}

                            onBlur={(e) => editTag(index, e.target.textContent)} 
                            
                            className="min-w-[5rem] px-1.5 max-w-[10rem] overflow-hidden focus:outline-none h-6 min-w-min" role="textbox" contentEditable="true">{tag}
                        </span>
                        <div className="cursor-pointer" onClick={() => deleteTag(index)}><i className="fa-solid fa-xmark h-6 w-6 flex items-center justify-center rounded text-xs text-white"></i></div>
                    </div>
                ))}

                <div className="flex text-gray-50 text-xs bg-gray-400 rounded-sm leading-6 font-semibold h-6 mb-2">
                    <span
                        onKeyPress={(e) => {
                            if(e.code == "Enter") {
                                addTag(e.target.textContent);
                                e.target.textContent = "";
                            }
                        }}
                        
                        onBlur={(e) => {
                            addTag(e.target.textContent);
                            e.target.textContent = ""
                        }} 
                        
                        className="min-w-[5rem] pl-1.5 max-w-[10rem] overflow-hidden focus:outline-none h-6" role="textbox" contentEditable="true">

                    </span>
                    <div className="cursor-pointer"><i className="fa-solid fa-plus h-6 w-6 flex items-center justify-center rounded text-[0.7rem] text-white"></i></div>
                </div>
            </div>
            
            <button className="h-9 bg-blue-500 rounded-md w-full text-white text-ml font-semibold" type="button" onClick={addRecipe}>Submit</button>
        </form>
    );
}

export default RecipeForm;





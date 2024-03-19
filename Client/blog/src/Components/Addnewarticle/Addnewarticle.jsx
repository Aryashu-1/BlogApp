import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ArticleContext } from '../Context/ArticleContext';

function Addnewarticle() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [article, setArticle] = useContext(ArticleContext);

    const registerSubmit = (newArticle) => {
        console.log(newArticle);
        Addarticle(newArticle);
    };

    const Addarticle = (newarticle) => {
        let demo = [...article,newarticle];
        
        setArticle(demo);
    };

    useEffect(() => {
        console.log(article);
    }, [article]);

    return (
        <div>
            <form className='px-10' onSubmit={handleSubmit(registerSubmit)}>
                <div className="my-4">
                    <h1 className="font-semibold">Title</h1>
                    <input
                        placeholder="title"
                        className="w-full shadow-sky-600 shadow-md border-gray-500 border-2 text-black p-1 rounded-sm"
                        type=""
                        {...register("Title", { required: true })}
                    ></input>
                    {errors.Title?.type === "required" && (
                        <h3 className="px-1 text-sm text-red-600">! Enter Title</h3>
                    )}
                </div>
                <div className="my-4">
            <h1 className="font-semibold">Category</h1>
            <input
              placeholder="category"
              className="w-full  shadow-sky-600 shadow-md border-gray-500 border-2  text-black p-1 rounded-sm"
              type=""
              {...register("Category", { required: true })}
            ></input>
            {errors.Category?.type === "required" && (
              <h3 className="px-1 text-sm  text-red-600">! Enter Title</h3>
            )}
          </div>
          <div className="my-4">
            <h1 className="font-semibold">Description</h1>
            <input
              placeholder="Description"
              className="w-full  shadow-sky-600 shadow-md border-gray-500 border-2  text-black p-1 rounded-sm"
              type=""
              {...register("Description", { required: true })}
            ></input>
            {errors.Description?.type === "required" && (
              <h3 className="px-1 text-sm  text-red-600">! Enter Title</h3>
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className=" bg-gray-600 text-lg rounded-xl p-3 text-white hover:bg-sky-600     "
            >
              Publish
            </button>
                </div>
            </form>
        </div>
    );
}

export default Addnewarticle;

import React from 'react';
import { useState } from "react";


function Delete(){

    const [title,setTitle] = useState("");




    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()

        try{

            const response = await fetch(
                "http://localhost:8080/",
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title,
                    }),
                }
            );
            if (response.ok) {
                console.log("DELETE succeeded")
                alert("削除しました")
            } else {
                console.error("POST request failed")
            }

            setTitle("");
            //setCategory("1");
            //setCurriculum("1");


        } catch (err) {
            console.error(err)
        }
    };


    return(
        <form
            style={{display: "flex", flexDirection: "column"}}
            onSubmit={handleSubmit}
            action="http://localhost:8080/"
            method="DELETE"
        >

            <div >
                <label>タイトル: <input
                    type={"text"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                ></input></label>
            </div>

            <button type={"submit"}>削除する</button>
        </form>

    )
}
export default Delete;
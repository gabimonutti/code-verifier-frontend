import React, { useEffect, useState } from "react";

// React Router DOM Imports
import { useNavigate, useParams } from "react-router-dom";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { getKataByID } from "../services/katasService";
import { AxiosResponse } from "axios";
import { Kata } from "../utils/types/Kata.type";
import { Editor } from "../components/editor/Editor";

export const KatasDetailPage = () => {

    let loggedIn = useSessionStorage("sessionJWTToken");
    let navigate = useNavigate();

    
    // Find id from params
    let { id } = useParams();
    const [kata, setKata] = useState<Kata | undefined>(undefined)

    const [showSolution, setShowSolution] = useState(false)

    useEffect(() => {
        if (!loggedIn) {
            return navigate("/login");
        } else {
            if (id) {
                getKataByID(loggedIn, id).then((response:AxiosResponse) => {
                    if (response.status == 200 && response.data) {
                        let kataData = {
                            _id: response.data._id,
                            name: response.data.name,
                            description: response.data.description,
                            level: response.data.level,
                            stars: response.data.stars,
                            intents: response.data.intents,
                            creator: response.data.creator,
                            solution: response.data.solution,
                            participants: response.data.participants   
                        }
                        setKata(kataData);
                        console.table(kataData);
                    }

                }).catch((error) => console.error(`[Kata by ID ERROR]: ${error}`));
            } else {
                return navigate("/katas");
            }

        }
    }, [loggedIn])

    // Variable to navigate between stack of routes
    // let navigate = useNavigate();

    return (
        <div>
            <h1>
                Katas Detail Page: { id }
            </h1>
            { kata ? 
            <div className="kata-data">
                <h2>{kata?.description}</h2>
                <h3>Rating: {kata?.stars}/5</h3>

                <button onClick={() => setShowSolution(!showSolution)}>
                    {showSolution ? "Show Solution" : "Hide Solution"}
                </button>
                {showSolution ? null : <Editor>{kata?.solution}</Editor>}
            </div>
            :
            <div className="kata-data">
                <h2>Loading data...</h2>
            </div>
            }
            


        </div>
    )
}
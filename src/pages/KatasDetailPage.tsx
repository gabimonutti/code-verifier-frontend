import React, { useEffect } from "react";

// React Router DOM Imports
import { useNavigate, useParams } from "react-router-dom";
import { useSessionStorage } from "../hooks/useSessionStorage";

export const KatasDetailPage = () => {

    let loggedIn = useSessionStorage("sessionJWTToken");
    let navigate = useNavigate();

    
    // Find id from params
    let { id } = useParams();

    useEffect(() => {
        if (!loggedIn) {
            return navigate("/login");
        }
    }, [loggedIn])

    // Variable to navigate between stack of routes
    // let navigate = useNavigate();

    return (
        <div>
            <h1>
                Katas Detail Page: { id }
            </h1>
        </div>
    )
}
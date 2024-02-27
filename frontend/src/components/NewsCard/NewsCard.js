import React, { useEffect, useState } from "react";
import "./NewsCard.css"

export default function NewsCard(props) {
    const [show, setShow] = useState(false);
    // const [showUpdateApplicationModal, setshowUpdateApplicationModal] = useState(false);
    // const showInfo = (e) => {
    //     swal({
    //         title: "Details de l'application",
    //         text: JSON.stringify(props),
    //     });
    //     // console.log(props.note)
    // }
    //onClick={(e) => showInfo(props) }
    return (
        <div className="card">
            <img src={props.imageUrl} alt={props.title} className="card-image" />
            <div className="card-content">
                <h2 className="card-title">{props.title}</h2>
                <p className="card-description">{props.description}</p>
            </div>
        </div>
    );
}
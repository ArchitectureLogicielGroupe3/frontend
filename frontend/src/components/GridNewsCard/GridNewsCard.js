import React, {useState} from 'react';
import "./GridNewsCard.css"
import NewsCard from "../NewsCard/NewsCard";

export default function GridNewsCard(props) {
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
        <div className="grid-container">
            {props.cardsData.map(card => (
                <NewsCard
                    key={card.id}
                    imageUrl={card.imageUrl}
                    title={card.title}
                    description={card.description}
                />
            ))}
        </div>
    );
}

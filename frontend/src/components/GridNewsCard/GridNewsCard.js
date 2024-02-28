import React, {useState} from 'react';
import "./GridNewsCard.css"
import NewsCard from "../NewsCard/NewsCard";

export default function GridNewsCard(props) {
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [showNextButton, setShowNextButton] = useState(false);

    const handleCardClick = (index) => {
        setSelectedCardIndex(index === selectedCardIndex ? null : index);
        setShowNextButton(true);
    };
    const handleNextButtonClick = () => {
        if (selectedCardIndex !== null) {
            const selectedCard = props.cardsData[selectedCardIndex];
            alert(`User's choice:\nTitle: ${selectedCard.title}\nDescription: ${selectedCard.description}`);
        } else {
            alert("No card selected.");
        }
    };

    // <h2 className={"tlitleList"}>Select one of this news</h2>
    return (
        <div>
            <h2 className={"tlitleList"}>Select one of this news</h2>
            <div className="grid-container">
                {props.cardsData.map((card, index) => (
                    <NewsCard
                        key={card.id}
                        imageUrl={card.imageUrl}
                        title={card.title}
                        description={card.description}
                        isSelected={index === selectedCardIndex}
                        onClick={() => handleCardClick(index)}
                    />
                ))}
            </div>
            {showNextButton && (
                <div style={{textAlign: 'center', marginTop: '20px'}}>
                    <button className={"coolButon"} onClick={handleNextButtonClick}>Next</button>
                </div>
            )}
        </div>
    );
}

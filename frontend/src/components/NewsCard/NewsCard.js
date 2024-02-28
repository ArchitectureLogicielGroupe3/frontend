import React, { useEffect, useState } from "react";
import "./NewsCard.css"

export default function NewsCard(props) {
    const { imageUrl, title, description, isSelected, onClick } = props;
    return (
        <div className={`card ${isSelected ? 'selected' : ''}`} onClick={onClick}>
            <img src={props.imageUrl} alt={props.title} className="card-image"/>
            <div className="card-content">
                <h2 className="card-title">{props.title}</h2>
                <p className="card-description">{props.description}</p>
            </div>
        </div>
    );
}
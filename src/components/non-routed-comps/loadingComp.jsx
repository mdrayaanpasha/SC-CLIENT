import React, { useState, useEffect } from 'react';



// Random furniture facts
const furnitureFacts = [
    'The oldest known chair is over 5,000 years old!',
    'The term “couch” comes from the French word “coucher,” meaning “to lie down.”',
    'Ancient Egyptians were the first to use wooden beds with raised frames.',
    'The first known tables were used by ancient Egyptians for dining and working.',
    'Chippendale furniture, popular in the 18th century, is named after its designer, Thomas Chippendale.',
    'The average lifespan of a sofa is about 7-15 years.'
];

// Function to get a random fact
const getRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * furnitureFacts.length);
    return furnitureFacts[randomIndex];
};

const LoadingComponent = () => {
    const [randomFact, setRandomFact] = useState('');

    useEffect(() => {
        setRandomFact(getRandomFact());
    }, []);

    const loadingStyle = {
        textAlign: 'center',
        fontSize: '24px',
        margin: '20px',
        fontFamily: 'Arial, sans-serif',
    };

    return (
        <div style={loadingStyle}>
            <p>Loading...</p>
            <p style={{ fontStyle: 'italic', fontSize: '18px' }}>{randomFact}</p>
        </div>
    );
};

export default LoadingComponent;

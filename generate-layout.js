const clg = require('crossword-layout-generator');
const fs = require('fs');

// All the words/clues
const words = [
    // Core words - prioritize these
    { answer: "WILLYOUBEMYVALENTINE", clue: "The question this puzzle is really asking..." },
    { answer: "BARRIOCHINO", clue: "First date spot" },
    { answer: "CRUNCHFACTOR", clue: "The dream Food Network show you want to create" },
    { answer: "WESTVILLAGE", clue: "Neighborhood where San Sabino is located" },
    { answer: "FISHCHEEKS", clue: "Favorite crustacean dish spot in the city" },
    { answer: "MARIOPARTY", clue: "Video game we love to play together" },
    { answer: "KEYLIMEPIE", clue: "Our favorite dessert in Red Hook" },
    { answer: "MARGARITAS", clue: "What we had for our first date" },
    { answer: "SANSABINO", clue: "Favorite seafood restaurant" },
    { answer: "LIMANTOUR", clue: "Our favorite cocktail bar in Mexico City" },
    { answer: "VIACAROTA", clue: "Italian restaurant where they refused to give us sauce for our calamari" },
    { answer: "SCALLOPS", clue: "The dish we made on our first Valentine's Day" },
    { answer: "BACALHAU", clue: "Portuguese fish we never tried but made a song about" },
    { answer: "DHAMAKA", clue: "Restaurant we went to for your first birthday together" },
    { answer: "ALGARVE", clue: "South coast of Portugal where we enjoyed lots of beach time" },
    { answer: "LEITAO", clue: "Portuguese restaurant in NYC we enjoyed a lot" },
    { answer: "PANDAN", clue: "Your favorite Southeast Asian cocktail ingredient" },
    { answer: "HUMMUS", clue: "Makes both of us bloated" },
    { answer: "MONTY", clue: "Name of character I love picking in Mario Party that you hate" },
    { answer: "TACOS", clue: "We ate so many of these in Mexico City" },
    { answer: "CAVE", clue: "Cool formation we saw by boat in Algarve (Benagil ___)" },
    { answer: "PEAS", clue: "What I said fell from the sky to start a conversation... and what actually did fall after our second date!" },
    { answer: "COD", clue: "Portuguese fish (shorter name)" }
];

// Generate the layout
const layout = clg.generateLayout(words);

console.log("=== CROSSWORD LAYOUT GENERATED ===\n");
console.log(`Grid size: ${layout.cols} x ${layout.rows}\n`);

// Show the grid visually
console.log("Grid preview:");
console.log(layout.table_string.replace(/<br>/g, '\n'));

// Show placed words
const placedWords = layout.result.filter(w => w.orientation !== 'none');
const unplacedWords = layout.result.filter(w => w.orientation === 'none');

console.log(`\n=== PLACED WORDS (${placedWords.length}) ===`);
placedWords.sort((a, b) => a.position - b.position);
placedWords.forEach(w => {
    console.log(`${w.position}. ${w.answer} (${w.orientation}) at (${w.startx}, ${w.starty})`);
});

if (unplacedWords.length > 0) {
    console.log(`\n=== UNPLACED WORDS (${unplacedWords.length}) ===`);
    unplacedWords.forEach(w => {
        console.log(`- ${w.answer}`);
    });
}

// Save the layout as JSON for use in the crossword
const outputData = {
    cols: layout.cols,
    rows: layout.rows,
    table: layout.table,
    words: placedWords.map(w => ({
        word: w.answer,
        clue: w.clue,
        row: w.starty - 1,  // Convert to 0-indexed
        col: w.startx - 1,  // Convert to 0-indexed
        direction: w.orientation,
        number: w.position
    }))
};

fs.writeFileSync('crossword-layout.json', JSON.stringify(outputData, null, 2));
console.log("\n=== Layout saved to crossword-layout.json ===");

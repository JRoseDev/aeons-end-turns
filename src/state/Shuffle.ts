export const shuffle = <T>(items: T[]): T[] => {
    let currentIndex = items.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [items[currentIndex], items[randomIndex]] = [
            items[randomIndex],
            items[currentIndex],
        ];
    }

    return items;
};

const fs = require('fs');

const items = JSON.parse(fs.readFileSync('items_database.json', 'utf8'));

function getPaginatedItems(cursor, limit = 2) {
    console.log(`Fetching Page (Cursor: ${cursor ||'START' }, Limit: ${limit})`);

    let startIndex = 0;
    if(cursor) {
        const index = items.findIndex(item => item.id === cursor);
        if(index !== -1) startIndex = index + 1;
    }

    const paginatedSlice = items.slice(startIndex, startIndex + limit);
    const nextCursor = paginatedSlice.length > 0 ? paginatedSlice[paginatedSlice.length - 1].id : null;

    console.log("Fetched Items:", paginatedSlice);

    return {data: paginatedSlice, nextCursor};
}

const page1 = getPaginatedItems(null, 2);
const page2 = getPaginatedItems(page1.nextCursor, 2);
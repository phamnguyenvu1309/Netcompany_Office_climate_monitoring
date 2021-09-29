const feedsDefaultState = [];

const feeds = (state = feedsDefaultState, action) => {
    switch (action.type) {
        case 'FETCH_FEEDS':
            return action.feeds;
        default: 
            return state
    }
}

export default feeds;
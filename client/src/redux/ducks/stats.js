export const SET_STATS = 'setStats';
export const GET_STATS = 'getStats';


export const setStats = (stats) => ({
    type: SET_STATS,
    stats
})

export const getStats = () => ({
    type: GET_STATS
})

const initialState = {
    stats: {
        topItems: [],
        topCategories: [],
        monthlyItems: [],
        totalAmmount: 0
    }
}

export default function stats(state=initialState, action) {
    switch(action.type){
        case SET_STATS:
            const stats = action.stats;
            return { ...state, stats }
        default:
            return state
    }
}
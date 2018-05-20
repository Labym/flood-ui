const errLog = {
    state: {
        errLog: [],
    },
    mutations: {
        ADD_LOG: (state, log) => {
            state.errLog.push(log)
        },
        CLEAR_ALL_LOG: (state, action) => {
            state.errLog = []
        }
    }

}

export default errLog

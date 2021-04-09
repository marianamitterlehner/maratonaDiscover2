let data = [
    {
        id: 1, 
        name: "Pizza Guloso",
        "daily-hours": 2,
        "total-hours": 2,
        created_at: Date.now(),
    },
    {
        id: 2, 
        name: "OneTwo Project",
        "daily-hours": 7,
        "total-hours": 64,
        created_at: Date.now(),
    }
]

module.exports = {
    
    get() {
        return data;
    },
    update(Newdata) {
        data = Newdata;
    }
}
const constructMethod = app => {
    app.get("*", (req,res) => {
        res.status(404).send("error 404: page not found");
    })
}

module.exports = constructMethod;
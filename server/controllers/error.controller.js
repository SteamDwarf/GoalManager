const errorGet = (req, res) => {
    res.status(500)
    throw new Error("Error");
}

module.exports = {errorGet};
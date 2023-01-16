const reportRequest = async (req, res, next) => {
    const params = req.params;
    const query = req.query;
    const body = req.body;
    const url = req.url;
    console.log(
        `Today ${new Date()} a query has been received on the route ${url} 
with the parameters:
`,
        "with params:",
        params,
        "with query:",
        query,
        "with body:",
        body
    );
    next();
};

module.exports = { reportRequest };
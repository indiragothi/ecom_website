class Apifeatures {
    constructor(query, querystr) {
        this.query = query;
        this.querystr = querystr;
    }

    search() {
        const keywords = this.querystr.keyword ? {
            name: {
                $regex: this.querystr.keyword,
                $options: "i",
            },
        } : {}
        this.query = this.query.find({ ...keywords })
        return this
    }

    filter() {
        const querycopy = { ...this.querystr }
        const removefield = ["keyword", "page", "limit"];
        removefield.forEach((key) => delete querycopy[key])
        let querystr = JSON.stringify(querycopy)
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `${key}`);
        this.query = this.query.find(JSON.parse(querystr))
        return this
    }

    pagination(resultperpage) {
        const currentpage = Number(this.querystr.page) || 1;
        const skip = resultperpage * (currentpage - 1);
        this.query = this.query.limit(resultperpage).skip(skip);
        return this;
    }
}

module.exports = Apifeatures
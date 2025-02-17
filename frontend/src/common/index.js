const backendDomain = "http://localhost:4000"

const SummaryApi = {
    addProduct : {
        url : `${backendDomain}/api/v1/add-product`,
        method : "post"
    }
}

export default SummaryApi;
class GeneralController {

    constructor(service){
        this.service = service;

        this.search = this.search.bind(this);
        this.autoComplete = this.autoComplete.bind(this);
    };

    async search(req, res){

        const searchParams = req.body;
        searchParams.per_page = 100;
        console.log(`Passing following params`, searchParams, 'to service layer');

        const results = await this.service.search(searchParams);

        res.status(results.status);

        return res.json({
            message:results.statusText,
            data:results.data,
        })

    }

    async autoComplete(req, res){

        const searchParams = req.query;
        searchParams.per_page = 100;
        console.log(`Passing following params`, searchParams, 'to service layer');

        const results = await this.service.autoComplete(searchParams);

        res.status(results.status);

        return res.json({
            results
        }
        )

    }
}

export default GeneralController;
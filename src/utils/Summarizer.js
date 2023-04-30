
module.exports = class Summarizer {

    constructor({openai, model}) {
        this.openai = openai;
        this.model = model;
    }

    async summarize(text) {
        const prompt = `Summarize this conversation without using a heading or a title: """${text}"""`
        const params = {

            model: this.model, 
            temperature: 0,
            max_tokens: 200
        }
        

        const response = await this.openai.createCompletion({
            ...params,
            prompt
        });

            const data = response.data;
        console.log(data)

        const { choices = [] } = data;


        
        return choices?.[0]?.text?.trim();;
    }


}
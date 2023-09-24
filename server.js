const PORT=5000
const express = require('express')
const cors = require('cors')

const app = express()
// allows us to work with json while sending stuff from frontend to backend without POST request
app.use(express.json())
app.use(cors())

// will create a .sth file to keep it more safe
const API_KEY = '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'

// async function
app.post('',async (req, res)=>{
    try{
        console.log("from server"+req.body.message)
        // fetch is an api keyword, making a post request to the url given
        const response = await fetch('https://api.openai.com/v1/chat/completions',
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    // {role:"system", content: "Mention any grammatical, spelling or sentence construction mistakes made, in the format 'Correction: ', at the end. In addition, continue the casual conversation"},
                    {role:"system", content: "You answer with casual replies while also correcting any grammatical, spelling or sentence construction mistakes"},
                    {role:"user", content: "so how was ur day"},
                    {role:"user", content: "It has been a hectic day at work for me. What about you? How has your day been?\n\n(Correction: So, how was your day?)"},
                    {role: "user", content: req.body.message},
                ],
                max_tokens: 50,
            })
        })

        const data = await response.json()
        res.send(data)
    }
    catch(error){
        console.error(error)
    }
})

app.listen(PORT, () => console.log('server running on port '+PORT))
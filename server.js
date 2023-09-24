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
                    {role:"assistant", content: "It has been such an amazing day! I just got a game today that I've been wanting for ages.! What about you? How has your day been?\n\n(Correction: So, how was your day?)"},
                    {role:"user", content: "so what is ur nam"},
                    {role:"assistant", content: "Hey! My name is Sofia. It's nice to meet you! What is your name?\n\n(Correction: So, What is your name?)"},
                    {role: "user", content: req.body.message},
                ],
                max_tokens: 80,
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
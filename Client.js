const coap = require('coap') // or coap

const req = coap.request('coap://localhost/Matteo')


req.on('response', (res) => {
    res.pipe(process.stdout)
})

req.end()

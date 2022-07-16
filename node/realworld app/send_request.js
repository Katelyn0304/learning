const request = require("request");

const options = {
    url: "localhost:3000/api/personal_cases",
    headers: {
        "Content-Type": "application/json",
        "x-auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmNkNTU0ZDFhM2I5MWE2NTkzNmI3NTYiLCJsZXZlbCI6NCwiaWF0IjoxNjU3OTgzMzMzfQ.c31VYdlGQYvE8VKCqqnRDIkWzTEn9tSuSKSEphCai7E",
    },
    body: JSON.stringify({
        id_number: "123",
        name: "John",
        birth: "2003/12/24",
        cause: "beat",
        against: "Mary",
        lawyer: [
            {
                code_name: "penguin",
            },
        ],
    }),
};

async function sendRequest(request, options) {
    request.post(options, (error, response, body) => {
        if (error) {
            console.log("Error occur when sending request.");
            console.log(`Error: ${error}`);
        } else {
            console.log("Send request sucessfully!");
        }
    });
}

for (let i = 0; i < 5; i++) {
    sendRequest(request, options);
}
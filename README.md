# Node.js Test Task

## Project Setup
```
git clone https://github.com/varvar/nlp.git
cd to folder nlp
npm install
npm update
```

### Run
```
npm start
```
Once server started it will be accessible on http://localhost:3000/

### API Reference

**Perform tokenizer process**
----
  Run tokenizer process for provided .txt file. Average processing time for 5MB file is about 10 sec.

* **URL**

  http://localhost:3000/process

* **Method:**
  
  `POST`
  
* **Data Params**

  ```
    {"file":"http://www.gutenberg.org/cache/epub/10/pg10.txt"}

  ```
    Please note, that file property is required and not optional

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "processStatus": "Done",
        "fileName": "pg10.txt",
        "chunksProcessed": 148,
        "state": {
            "totalProcessingTime": "7 sec",
            "fileSize": "4.25 MB",
            "downloadSpeed": "601.7 kB/sec"
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ errorObj }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message": "File value can not be empty!" }`

* **Notes:**

  "fileName" property from response object is required for getting the words list in next API call, since it's identifier for retrieving relevant json data. The rest of properties are for information only.  

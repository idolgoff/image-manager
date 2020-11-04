# Image-Manager
Service for image managing (download, save, serve, delete)

## ToDo
- [x] Main processing pipeline
- [x] Check config at start time (reduce costs at runtime)
- [ ] Check errors resistance
- [x] Add queue management
- [ ] Add queue UI
- [ ] Add tune settings (concurency, rateLimit and so on)
- [ ] Extract config from code
- [ ] Cover with tests

## Start params
Сonfig 
```javascript
{
  mainDir: [path1, path2, ...],
  sets: [{
    type: 'thumb' | 'bigImage' | ...whatever,
    subPath: string, // path + subpath
    size?: { width?: number, height?: number }, // if only one side set then image size will be processed proportionately
  }]
}
```

## Main usage
Image manager is used for download, process and store images with given urls. It is usefull for e-commerce catalog processing.

**prepare data -> 2) queue -> 3) processing (download -> manipulate -> store) -> 4) callback**

1. Input params format (JSON)
```
{data: {imageUrl, meta, webHook}}
```
webHook - POST api endpoint getting {...data, ...processingResult}

2. Queue
Use api endpoint
```
/queue/add
```
Input params as FormData

3. Processing
    1. Download
    2. Manipulate
    3. Store

4. Callback

## API Interface
/v1/ prefix
- /queue
    - /image
        - POST add new image job
        - GET get job status
    - /images
        - POST add images job
        - GET get job status
- /images
    - remove ?query ???

## Core modules
- [fastify](https://github.com/fastify/fastify) - http server
- [bull](https://github.com/OptimalBits/bull) - for queue management
- [bull-board](https://github.com/vcapretz/bull-board) - Bull's UI (view status)
- [sharp](https://github.com/lovell/sharp)

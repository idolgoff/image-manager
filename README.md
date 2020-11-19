# Image-Manager
Service for image managing (download, save, serve, delete)

## Start with docker-compose
1. It needs running redis
2. It needs config file

See example https://github.com/idolgoff/image-manager/tree/main/docker

## How to use it
### Single image mode
POST /v1/queue/image
```
body: {
	"imageUrl": "https://www.silverdisc.co.uk/sites/default/files/sd_importer/lion_webp_10.webp",
	"webHook": "http://ya.ru"
}
```
it returns 
```
{
    "jobId": "3473c73e-720b-48bf-884f-983099fbc181"
}
```
GET /v1/queue/image?jobId=3473c73e-720b-48bf-884f-983099fbc181
returns job status
```
{
    "result": "completed"
}
```

## ToDo
- [x] Main processing pipeline
- [x] Check config at start time (reduce costs at runtime)
- [ ] Check errors resistance
- [x] Add queue management
- [ ] Add queue UI
- [ ] Add tune settings (concurency, rateLimit and so on)
- [ ] Extract config from code
- [ ] Cover with tests

## Params
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

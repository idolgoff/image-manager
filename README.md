# Image-Manager
Service for image managing (download, save, serve, delete)

## ToDo
[x] Main processing pipeline 
[] Check config at start time (reduce costs in runtime)
[] Check errors resistance

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

1. Input params format (FormData)
```
{data: {imgUrls, meta}, callback: (err, data) => {}}
```

2. Queue
Use api endpoint
```
/queue/add
```
Input params as FormData

3. Processing
3.1. Download
3.2. Manipulate
3.3. Store

4. Callback

## API Interface
- /queue
-- add-images
-- list
-- remove ?query
- /images
-- remove ?query

## Core modules
- [fastify](https://github.com/fastify/fastify) - http server
- [bull](https://github.com/OptimalBits/bull) - for queue management
- [bull-board](https://github.com/vcapretz/bull-board) - Bull's UI (view status)
- [sharp](https://github.com/lovell/sharp)

# Image-Manager
Service for image managing (download, save, serve, delete)

## Start params
Сonfig 
```javascript
{
  mainDir: [path1, path2, ...],
  [{
    type: 'thumb' | 'bigImage' | ...whatever,
    subPath: string, // path + subpath
    size?: { width?: number, height?: number }, // if only one side set then image size will be processed proportionately
  }]
}
```

## Main usage
Image manager is used for download, process and store images with given urls. It is usefull for e-commerce catalog processing

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

# image-api

Image CDN

## Install

    $ git clone https://github.com/jumacro/image-api.git
    $ cd image-api
    $ yarn
    $ yarn start
    
   #### Configure
    
    Default server port is 8000.
    
    Edit env/*.js file according to your environment.
    
## Test
  
    $ yarn test

## Usage

   ### Upload a file
    
    API endpoint: http://localhost:8000/v1.0/files/upload
    Method: POST
    Auth: Basic. Use security.api.appId and security.api.appSecrect from env/*.js file for username and password accordingly
    Payload:
    
    {
      projectName:EasyApp
      scope:UserProfile
      container:3
      baseUrl:http://localhost:8000/
      filename: test.jpg
    }
    
    Expected response:
    
    {
        "error": false,
        "success": {
            "code": 200,
            "type": "OK",
            "data": [
                {
                    "imageUrl": "http://localhost:8000/EasyApp/UserProfile/3/test.jpg"
                }
            ]
        }
    }
    

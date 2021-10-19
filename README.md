# next_cross_ts2

 Version: 0.9.1

 Author  : Kouji Nakashima / kuc-arc-f.com

 date    : 2021/10/16 

 update  : 2021/10/17 

***
### Summary

Next.js + Typescript + Headless CMS , CRUD sample

***
### required

* Next.js : 11.1.2
* react : 17.0.2

***
### Setup

npm install

***
### Setup , etc
* next.config.js , 

if change URL, API URL, API_KEY, BASE_URL

```
API_URL: "http://localhost:3001",
MY_API_KEY: "123",
BASE_URL: "http://localhost:3002"
```

* package.json / scripts

if change, port number ( -p )

```
"dev": "next dev -p 3002"
```

***
### start server
* Start :

yarn dev

* if change , release mode

yarn serve


***
### apollo server

https://github.com/kuc-arc-f/apollo_head_ts1

***
### Related : 

https://zenn.dev/knaka0209/books/4ee53bad905ec2/viewer/52ade7

***


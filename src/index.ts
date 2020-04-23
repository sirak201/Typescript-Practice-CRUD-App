import * as express from 'express'
import {Response , Request , Application} from "express"

const app : Application = express();


app.get(("/"), (req :  Request  , res : Response) => {

   res.send("HEllo")
})


app.listen(5000,  ()=> {
  console.log("Listening in port 500")
})

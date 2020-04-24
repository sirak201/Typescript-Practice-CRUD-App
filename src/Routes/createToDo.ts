import { Router , Request , Response} from 'express'

const router : Router = Router()


router.get('/' , (_ : Request , res : Response ) => {

  res.send({
      "This is your todo list" : "dddd"
  })

})


export {router as TodoRoute}

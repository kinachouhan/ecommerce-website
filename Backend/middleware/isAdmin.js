
export const isAdmin = async(req, res, next)=>{
     if(req.user.role !=="admin"){
          return res.status(400).json({
              success: flase,
              message: "Admin accesss only"
          })
     }
     next()
}
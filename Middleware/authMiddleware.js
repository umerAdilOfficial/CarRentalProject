   const adminMiddleware = (req , res , next) => {

      try {
          const password = req.header("admin-password");

   const passPhrase = process.env.ADMIN_PASSWORD;
   if (password === passPhrase){
    console.log("given access")
    next();
   }else {
    return res.status(400).send("only admin can access dashboard")
   }
      } catch (error) {
         res.status(400).send("Internal Error Occured")
      }
  
};

module.exports = adminMiddleware;
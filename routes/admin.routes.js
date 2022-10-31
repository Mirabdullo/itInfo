const { Router } = require("express")
const express = require("express")
const Validator = require('../middleware/validator');

express.application.prefix = express.Router.prefix = function(path, configure){
    const router = express.Router()
    this.use(path,router)
    configure(router)
    return router
}

const { getAdmin, addAdmin, updateAdminById, deleteAdminById, loginAdmin, logoutAdmin, refreshAdminToken } = require('../controllers/admin.controller');

const adminPolice = require("../middleware/adminPolice")

const router = Router()
router.prefix('/',(rout) => {
    rout.prefix('/', (admin) => {
        admin.get("/", getAdmin)
        admin.get("/refresh",refreshAdminToken)
        admin.post("/logout", logoutAdmin)
        admin.post("/login",Validator("email_passAdmin"),loginAdmin)
        admin.post("/add",adminPolice, Validator("admin"),addAdmin)
        admin.put("/:id",adminPolice, Validator("admin"),updateAdminById)
        admin.delete("/:id",adminPolice,deleteAdminById)
    })
})

module.exports = router


// express.application.prefix = nestedRoutes;  
// express.Router.prefix = nestedRoutes;  
  
// routes.prefix('/', (rout) => {      
//     rout.prefix('/', (admin) => {  
  
//       admin.post('/login', sAdminControl.logIn);  
//       admin.delete('/logout', AdminPolice.verify, sAdminControl.logOut);  
//       admin.post('/add', CreatorPolice.verify, sAdminControl.newAdmin);  
//       admin.put('/:id', AdminPolice.verify, sAdminControl.editAdmin);  
//       admin.put('/edit/:id', CreatorPolice.verify, sAdminControl.editAdminByCreator);  
//       admin.delete('/:id', CreatorPolice.verify, sAdminControl.deleteAdmin);  
//       admin.get('/:id', AdminPolice.verify, sAdminControl.detail);  
//       admin.get('/', CreatorPolice.verify, sAdminControl.list);  
  
//       admin.prefix('/market', (market) => {  
//         market.post('/add', AdminPolice.verify, MarketControl.newMarket);  
//         market.get('/list', AdminPolice.verify, MarketControl.getMarketListAllLang);   
//         market.get('/:id', AdminPolice.verify, MarketControl.getMarketByIDAllLang);       
//         market.delete('/:id', AdminPolice.verify, MarketControl.deleteMarket);  
//         market.put('/:id', AdminPolice.verify, MarketControl.editMarket);           
//       });

















// const {Router} = require('express');
// const { getAdmin, addAdmin, updateAdminById, deleteAdminById, loginAdmin, logoutAdmin, refreshAdminToken } = require('../controllers/admin.controller');
// const adminPolice = require('../middleware/adminPolice');



// const router = Router()

// router.get("/",adminPolice, getAdmin)
// router.get("/refresh",refreshAdminToken)
// router.post("/logout", logoutAdmin)
// router.post("/add",addAdmin)
// router.put("/:id",updateAdminById)
// router.delete("/:id",deleteAdminById)
// router.post("/login",loginAdmin)


// module.exports = router


const {Router} = require('express');
const { getAdmin, addAdmin, updateAdminById, deleteAdminById, loginAdmin } = require('../controllers/admin.controller');



const router = Router()

router.get("/",getAdmin)
router.post("/add",addAdmin)
router.put("/:id",updateAdminById)
router.delete("/:id",deleteAdminById)
router.post("/login",loginAdmin)


module.exports = router



express.application.prefix = nestedRoutes; 
express.Router.prefix = nestedRoutes; 
 
routes.prefix('/', (rout) => {     
    rout.prefix('/', (admin) => { 
 
      admin.post('/login', sAdminControl.logIn); 
      admin.delete('/logout', AdminPolice.verify, sAdminControl.logOut); 
      admin.post('/add', CreatorPolice.verify, sAdminControl.newAdmin); 
      admin.put('/:id', AdminPolice.verify, sAdminControl.editAdmin); 
      admin.put('/edit/:id', CreatorPolice.verify, sAdminControl.editAdminByCreator); 
      admin.delete('/:id', CreatorPolice.verify, sAdminControl.deleteAdmin); 
      admin.get('/:id', AdminPolice.verify, sAdminControl.detail); 
      admin.get('/', CreatorPolice.verify, sAdminControl.list); 
 
      admin.prefix('/market', (market) => { 
        market.post('/add', AdminPolice.verify, MarketControl.newMarket); 
        market.get('/list', AdminPolice.verify, MarketControl.getMarketListAllLang);  
        market.get('/:id', AdminPolice.verify, MarketControl.getMarketByIDAllLang);      
        market.delete('/:id', AdminPolice.verify, MarketControl.deleteMarket); 
        market.put('/:id', AdminPolice.verify, MarketControl.editMarket);          
      });
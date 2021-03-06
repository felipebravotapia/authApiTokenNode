const { Router } = require('express');
const AuthController = require('../controller/AuthController');
const { Validator } = require('express-json-validator-middleware');
const validator = new Validator({ allErrors: true });
const validate = validator.validate;

const router = Router();
const baseUrl = `/api/${process.env.VERSION_APP}/${process.env.APP_PATH_SERVICE}`;
const routes = [];

/** Configuración de validación de datos */
const AuthenticarReqSchema = require('../schemas/SwaggerComponents').components.schemas.Authenticar;

router.post('/getToken',validate({ body: AuthenticarReqSchema }), AuthController.getToken);
router.get('/validateToken', AuthController.validateToken);


/**
 * Muestra de las distintas rutas creadas
 */
console.log("********* Routes Avaibles ***********");
router.stack.forEach(middleware => {
    if (middleware.route) {
        let route = {};
        route.method = Object.keys(middleware.route.methods);
        route.path = baseUrl + middleware.route.path
        routes.push(route);
    }
});
console.table(routes);

module.exports = router;
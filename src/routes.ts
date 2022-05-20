import { Router } from "express"
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient"
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman"
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController"
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController"
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController"
import { FindAllDeliveriesController } from "./modules/clients/useCases/deliveries/FindAllDeliveriesController"
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController"
import { FindAllAvailableController } from "./modules/deliveries/useCases/findAllAvailable/FindAllAvailableController"
import { UpdateDeliverymanController } from "./modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController"
import { UpdateEndDateController } from "./modules/deliveries/useCases/updateEndDate/UpdateEndDateController"
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController"
import { FillAllDeliveriesDeliverymanController } from "./modules/deliveryman/useCases/findAllDeliveries/FindAllDeliveriesDeliverymanController"

const routes = Router()

const authenticateClientController = new AuthenticateClientController
const authenticateDeliverymanController = new AuthenticateDeliverymanController
const createClientController = new CreateClientController
const createDeliverymanController = new CreateDeliverymanController
const createDeliveryController = new CreateDeliveryController
const findAllAvailableController = new FindAllAvailableController
const updateDeliverymanController = new UpdateDeliverymanController
const findAllDeliveriesController = new FindAllDeliveriesController
const findAllDeliveriesDeliverymanController = new FillAllDeliveriesDeliverymanController
const updateEndDateController = new UpdateEndDateController

routes.post("/clients", createClientController.handle)
routes.post("/clients/authenticate", authenticateClientController.handle)
routes.get("/clients/deliveries", ensureAuthenticateClient, findAllDeliveriesController.handle)
routes.post("/deliveryman", createDeliverymanController.handle)
routes.post("/deliveryman/authenticate", authenticateDeliverymanController.handle)
routes.get("/deliveryman/available", ensureAuthenticateDeliveryman, findAllAvailableController.handle)
routes.get("/deliveryman/deliveries", ensureAuthenticateDeliveryman, findAllDeliveriesDeliverymanController.handle)
routes.post("/deliveries", ensureAuthenticateClient, createDeliveryController.handle)
routes.put("/deliveries/update-deliveryman/:id", ensureAuthenticateDeliveryman, updateDeliverymanController.handle)
routes.put("/deliveries/update-end-date/:id", ensureAuthenticateDeliveryman, updateEndDateController.handle)

export { routes }
import { Request, Response, Router } from "express";
import { sign } from "jsonwebtoken";

import { Auth } from "../middlewares/authentication";
import { EstimatePricesController } from "./../modules/uberEstimate/EstimatePricesController";

const auth = new Auth();

const router = Router();

const estimatePricesController = new EstimatePricesController();

router.use(
  "/apis",
    auth.authMiddleware

)
//API ROUTES
router.get(
  "/api/get-prices/:dropoff/:pickup",
  estimatePricesController.getPricesUber
);

router.get(
  "/api/get-prices/:pickup",
  
  estimatePricesController.getPricesUber
);


router.get("/", async (request: Request, response: Response) => {
  return response.json({ success: "it works!" }).status(200);
});

export default router;

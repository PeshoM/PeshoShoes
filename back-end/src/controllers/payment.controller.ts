import { User } from "../schemas/users.schema";
import { Request, Response } from "express";
const stripeSecretKey: string = process.env.STRIPE_SECRET_KEY || "";
const stripe = require("stripe")(stripeSecretKey);
const domain: string = "http://localhost:"+process.env.PORT;
const Post = async (req: Request, res: Response) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: "{{PRICE_ID}}",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${domain}?success=true`,
      cancel_url: `${domain}?canceled=true`,
    });

    res.redirect(303, session.url);
}

export default { Post }
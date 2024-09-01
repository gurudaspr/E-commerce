import React from "react";
import { Typography } from "@material-tailwind/react";

const shippingSections = [
  {
    title: "Shipping Policy",
    desc: "At ZestaMart, we offer shipping worldwide. Orders are processed within 1-2 business days, and you will receive a confirmation email with tracking information once your order is shipped.",
  },
  {
    title: "Shipping Rates",
    desc: "Shipping rates vary depending on your location and the total weight of your order. You can view the shipping fees during the checkout process before placing your order.",
  },
  {
    title: "Return Policy",
    desc: "We offer a 30-day return policy on all items. To be eligible for a return, the item must be unused, in its original packaging, and in the same condition as received.",
  },
  {
    title: "How to Initiate a Return",
    desc: "To initiate a return, contact our customer support team at support@zestamart.com. Include your order number and reason for the return. Once approved, you will receive return shipping instructions.",
  },
];

export function ShippingAndReturn() {
  return (
    <section className="px-8 py-20">
      <div className="container mx-auto">
        <div className="mb-14 text-center">
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-4 text-4xl !leading-snug lg:text-[40px]"
          >
            Shipping and Return
          </Typography>
          <Typography className="mx-auto font-normal text-[18px] !text-gray-500 lg:max-w-3xl">
            Learn about our shipping options and how to return products easily.
          </Typography>
        </div>
        <div className="max-w-3xl mx-auto grid gap-10">
          {shippingSections.map(({ title, desc }) => (
            <div key={title}>
              <Typography color="blue-gray" className="pb-6 text-[20px] font-bold">
                {title}
              </Typography>
              <div className="border-t border-gray-200 pt-4">
                <Typography className="font-normal !text-gray-500">
                  {desc}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ShippingAndReturn;

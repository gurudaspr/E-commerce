import React from "react";
import { Typography } from "@material-tailwind/react";

const faqs = [
  {
    title: "How do I track my order?",
    desc: "Once your order has been shipped, we will send you a tracking number via email. You can also log in to your account on ZestaMart to view your order status.",
  },
  {
    title: "What payment methods do you accept?",
    desc: "We accept various payment methods, including Visa, MasterCard, American Express, and PayPal. All transactions are encrypted and secure.",
  },
  {
    title: "How do I return a product?",
    desc: "If you’re not satisfied with your purchase, you can return it within 30 days. Please see our Shipping and Return page for more details on how to initiate a return.",
  },
  {
    title: "Can I change my order after it's placed?",
    desc: "If your order hasn’t been processed yet, you can modify it by contacting customer support. Once processed, the order can no longer be changed.",
  },
];

export function Faq() {
  return (
    <section className="px-8 py-20">
      <div className="container mx-auto">
        <div className="mb-14 text-center">
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-4 text-4xl !leading-snug lg:text-[40px]"
          >
            Frequently Asked Questions
          </Typography>
          <Typography className="mx-auto font-normal text-[18px] !text-gray-500 lg:max-w-3xl">
            Find answers to common questions about shopping at ZestaMart.
          </Typography>
        </div>
        <div className="max-w-3xl mx-auto grid gap-10">
          {faqs.map(({ title, desc }) => (
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

export default Faq;

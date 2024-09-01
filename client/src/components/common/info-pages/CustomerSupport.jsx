import React from "react";
import { Typography } from "@material-tailwind/react";

const supportSections = [
  {
    title: "How to Reach Us",
    desc: "Our customer support team is here to help you 24/7. You can reach us at support@zestamart.com or call us at +1-800-123-4567 for any inquiries.",
  },
  {
    title: "Common Issues We Can Assist With",
    desc: "We assist with order tracking, product issues, return processes, and general inquiries. If you encounter any issues with your order, don’t hesitate to contact us.",
  },
  {
    title: "Response Time",
    desc: "Our average response time is 24 hours. However, during peak seasons, responses may take a little longer. We appreciate your patience.",
  },
];

export function CustomerSupport() {
  return (
    <section className="px-8 py-20">
      <div className="container mx-auto">
        <div className="mb-14 text-center">
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-4 text-4xl !leading-snug lg:text-[40px]"
          >
            Customer Support
          </Typography>
          <Typography className="mx-auto font-normal text-[18px] !text-gray-500 lg:max-w-3xl">
            We're here to help! Contact us for any support inquiries.
          </Typography>
        </div>
        <div className="max-w-3xl mx-auto grid gap-10">
          {supportSections.map(({ title, desc }) => (
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

export default CustomerSupport;

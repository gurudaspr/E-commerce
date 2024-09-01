import React from "react";
import { Typography } from "@material-tailwind/react";

const termsSections = [
  {
    title: "Introduction",
    desc: "Welcome to ZestaMart. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions.",
  },
  {
    title: "Use of the Site",
    desc: "You agree to use the site only for lawful purposes. You are prohibited from using the site to engage in any activity that is harmful or disruptive to ZestaMart or its users.",
  },
  {
    title: "Product Availability",
    desc: "All products listed on ZestaMart are subject to availability. We reserve the right to discontinue any product at any time without notice.",
  },
  {
    title: "Payment and Pricing",
    desc: "Prices for our products are subject to change without notice. We accept various forms of payment and ensure all transactions are secure.",
  },
  {
    title: "Governing Law",
    desc: "These terms are governed by and construed in accordance with the laws of the jurisdiction in which ZestaMart operates, without regard to its conflict of law provisions.",
  },
  {
    title: "Changes to Terms",
    desc: "We may modify these terms and conditions at any time, so please review them periodically. Your continued use of the site after any changes constitutes acceptance of the updated terms.",
  },
];

export function TermsAndConditions() {
  return (
    <section className="px-8 py-20">
      <div className="container mx-auto">
        <div className="mb-14 text-center">
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-4 text-4xl !leading-snug lg:text-[40px]"
          >
            Terms and Conditions
          </Typography>
          <Typography className="mx-auto font-normal text-[18px] !text-gray-500 lg:max-w-3xl">
            Please read our terms and conditions carefully before using our site.
          </Typography>
        </div>
        <div className="max-w-3xl mx-auto grid gap-10">
          {termsSections.map(({ title, desc }) => (
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

export default TermsAndConditions;

import React from "react";
import { Typography } from "@material-tailwind/react";

const privacySections = [
  {
    title: "Introduction",
    desc: "We at ZestaMart are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information.",
  },
  {
    title: "Information We Collect",
    desc: "When you use our website, we may collect personal information such as your name, email address, and payment details. We also collect non-personal data such as browser type and IP address.",
  },
  {
    title: "How We Use Your Information",
    desc: "We use your personal information to process orders, provide customer support, and improve our services. We may also use your data to send promotional offers and updates.",
  },
  {
    title: "Sharing Your Information",
    desc: "We do not sell your personal information. However, we may share your data with third-party service providers who assist in operating our website, conducting business, or servicing you.",
  },
  {
    title: "Security",
    desc: "We take security seriously and implement a variety of measures to maintain the safety of your personal information. However, no method of transmission over the Internet is 100% secure.",
  },
  {
    title: "Your Consent",
    desc: "By using our site, you consent to our privacy policy. We may update this policy periodically, and any changes will be posted on this page.",
  },
];

export function PrivacyPolicy() {
  return (
    <section className="px-8 py-20">
      <div className="container mx-auto">
        <div className="mb-14 text-center">
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-4 text-4xl !leading-snug lg:text-[40px]"
          >
            Privacy Policy
          </Typography>
          <Typography className="mx-auto font-normal text-[18px] !text-gray-500 lg:max-w-3xl">
            Learn how we collect, use, and protect your personal data at ZestaMart.
          </Typography>
        </div>
        <div className="max-w-3xl mx-auto grid gap-10">
          {privacySections.map(({ title, desc }) => (
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

export default PrivacyPolicy;

import React from "react";
import { Button, Card, CardBody, IconButton, Typography } from "@material-tailwind/react";
import { XMarkIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid"; // Import Hero Icons
import {  useNavigate } from "react-router-dom";

export function Unauthorized() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-2 , { replace: true });   
      };
  
    return (
      <section>
        <div className="w-full px-4">
          <div className="grid h-screen place-items-center">
            <Card className="max-w-xl">
              <CardBody>
                <div className="flex w-full justify-end">
                  <IconButton variant="text" onClick={handleGoBack}>
                    <XMarkIcon className="h-6 w-6 text-gray-500" />
                  </IconButton>
                </div>
                <div className="text-center px-6">
                  <ExclamationCircleIcon className="h-24 w-24 text-red-500 mx-auto mb-4" />
                  <Typography color="blue-gray" className="mb-6 mt-10" variant="h4">
                    Unauthorized
                  </Typography>
                  <Typography className="text-[20px] font-normal text-gray-500">
                    You do not have permission to access this page.
                  </Typography>
                  <Button
                   onClick={handleGoBack}
                    className="mt-4 ml-4"
                    color="gray"
                  >
                    Go Back
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
    );
  }
  
  export default Unauthorized;
  
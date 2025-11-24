import { Suspense } from "react";
import DeviceAuthorizationForm from "./authorization-form";

const DeviceAuthorizationPage = () => {
  return (
    <Suspense fallback={null}>
      <DeviceAuthorizationForm />
    </Suspense>
  );
};

export default DeviceAuthorizationPage;

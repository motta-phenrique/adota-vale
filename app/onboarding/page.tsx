import { OnboardingWizard } from "./onboarding-wizard";

export default function OnboardingPage() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col bg-sand-50 lg:max-w-[680px] lg:py-6">
      <OnboardingWizard />
    </div>
  );
}

import { MdOutlineDone } from "react-icons/md";

interface StepItem {
  id: number;
  label: string;
}

interface ProgressProps {
  step: number;
  steps: StepItem[];
}

export function ProgressStep({ step, steps }: ProgressProps) {
  return (
    <section >
      <div className="flex items-start justify-center lg:justify-start text-xs lg:text-sm">
        {steps.map((item, index) => {
          const isActive = step === item.id;
          const isCompleted = step > item.id;
          const isLast = index === steps.length - 1;

          return (
            <div key={item.id} className="flex items-center">
          
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all
                  ${isCompleted || isActive ? "bg-primary-50 text-white" : "bg-gray-200 text-gray-400"}`}
                >
                  {isCompleted ? <MdOutlineDone size={22} /> : item.id}
                </div>

                <span
                  className={`transition-all
                  ${step >= item.id ? "text-primary-50 font-semibold" : "text-gray-400"}`}
                >
                  {item.label}
                </span>
              </div>

              {!isLast && (
                <div
                  className={`w-10 lg:w-25 h-1 mx-2 -mt-5 transition-all
                  ${step > item.id ? "bg-primary-100" : "bg-gray-200"}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

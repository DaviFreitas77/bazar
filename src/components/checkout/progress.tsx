import { MdOutlineDone } from "react-icons/md";

interface ProgressProps {
  step: number;
}
export function ProgressStep({ step }: ProgressProps) {
  return (
    <section className="w-full max-w-7xl mb-10">
      <div className="flex  items-start justify-center lg:justify-start text-xs lg:text-sm">
        {/* step1 */}
        <div className="flex items-center flex-col gap-1">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full bg-primary-50 ${
              step === 1 && "text-white"
            }`}
          >
            {step === 1 ? "1" : <MdOutlineDone size={22} color={"white"} />}
          </div>
          <span
            className={`${
              step === 1
                ? "text-primary-50 font-semibold"
                : "text-primary-50 font-semibold"
            }`}
          >
            Dados
          </span>
        </div>

        <div
          className={`w-15 lg:w-25 h-1 bg-gray-200 mt-5 ${
            step >= 2 && "bg-primary-100"
          }`}
        ></div>

        {/* step2 */}
        <div className="flex items-center flex-col gap-1 ">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 2
                ? "bg-primary-50 text-white"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            {step <= 2 ? "2" : <MdOutlineDone size={22} color={"white"} />}
          </div>
          <span
            className={`${
              step >= 2 ? "text-primary-50 font-semibold" : "hidden"
            }`}
          >
            Entrega
          </span>
        </div>

        <div
          className={`w-15 lg:w-25 h-1 bg-gray-200 mt-5 ${
            step >= 3 && "bg-primary-100"
          }`}
        ></div>

        {/* step3 */}
        <div className="flex items-center flex-col gap-1 ">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 3
                ? "bg-primary-50 text-white"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            {step <= 3 ? "3" : <MdOutlineDone size={22} color={"white"} />}
          </div>
          <span
            className={`${
              step >= 3 ? "text-primary-50 font-semibold" : "hidden"
            }`}
          >
            Pagamento
          </span>
        </div>

        <div
          className={`w-15 lg:w-25 h-1 bg-gray-200 mt-5  ${
            step >= 4 && "bg-primary-100"
          }`}
        ></div>

        <div className="flex items-center flex-col gap-1 ">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 4
                ? "bg-primary-50 text-white"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            {step < 4 ? "4" : <MdOutlineDone size={22} color={"white"} />}
          </div>
          <span
            className={`${
              step >= 4 ? "text-primary-50 font-semibold" : "hidden"
            }`}
          >
            Confirmação
          </span>
        </div>
      </div>
    </section>
  );
}

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

function Slider({ className, defaultValue, value, min = 0, max = 100, ...props }: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(() => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]), [value, defaultValue, min, max]);

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn("relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col", className)}
      {...props}
    >
      <SliderPrimitive.Track data-slot="slider-track" className={cn("bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5")}>
        <SliderPrimitive.Range data-slot="slider-range" className={cn("bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full")} />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="border-primary ring-ring/50 block size-4 shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
}

interface SliderPriceProps {
  maxPrice: number;
  minPrice: number;
  valueChange: React.Dispatch<React.SetStateAction<number[]>>;
}
function SliderProduct({ maxPrice, minPrice, valueChange }: SliderPriceProps) {
  const [value, setValue] = React.useState([minPrice, maxPrice]);

  return (
    <div className="w-full max-w-sm mt-2">

      <Slider
        value={value}
        onValueChange={(v) => {
          setValue(v);
        }}
        max={maxPrice}
        min={minPrice}
        step={1}
      />


      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">

        {/* Botão */}
        <div className="flex  flex-col gap-2 w-full">
          <div className="flex items-center gap-2 w-full justify-between " >
            <button onClick={() => valueChange([])} className="  bg-primary-50 text-white px-6 py-1 rounded-xs hover:opacity-85 transition cursor-pointer">
              Limpar
            </button>
            <div className="flex items-center gap-1 text-gray-800 font-medium">
              <span>{value[0].toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
              <span>-</span>
              <span>{value[1].toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
            </div>
          </div>
          <button onClick={() => valueChange(value)} className="bg-primary-50 text-white px-6 py-1 rounded-xs hover:opacity-85 transition cursor-pointer">
            Filtrar
          </button>

        </div>

        {/* Valores */}

      </div>
    </div>
  );
}

export { Slider, SliderProduct };

interface LoadingProps{
  width?: number;
  height?: number;
}

export function Loading({width,height}:LoadingProps) {
  return (
    <div className="text-center">
      <div
      style={{width:`${width}px`,height:`${height}px`}}
      className="w-5 h-5 border-4 border-dashed rounded-full animate-spin border-primary-50 mx-auto"></div>
    </div>
  );
}

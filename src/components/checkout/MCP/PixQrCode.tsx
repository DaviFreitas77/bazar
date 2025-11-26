
import { toast } from "sonner";
interface PixQRCodeProps {
  qrCode: string;           
  qrCodeBase64: string;     
}

export function PixQRCode({ qrCode, qrCodeBase64 }: PixQRCodeProps) {

  const handleCopy = () => {
    navigator.clipboard.writeText(qrCode);
    toast.success("PIX copiado!");

  };

  return (
    <div className="mt-6 flex flex-col items-center gap-4">
      {/* QR Code em imagem */}
      {qrCodeBase64 && (
        <img
          src={`data:image/png;base64,${qrCodeBase64}`}
          alt="PIX QR Code"
          className="w-60 h-60 object-contain rounded"
        />
      )}

      {/* Código copia e cola */}
      <div className="flex items-center bg-gray-100 border border-gray-200 rounded p-2 w-full max-w-md">
        <p className="flex-1 text-xs font-mono truncate">{qrCode}</p>
        <button
          onClick={handleCopy}
          className="ml-2 px-3 py-1 bg-primary-50 text-white rounded hover:opacity-90 transition text-sm"
        >
          Copiar
        </button>
      </div>

      <p className="text-gray-600 text-sm text-center mt-2">
        Escaneie o QR Code ou use o código acima para pagar via PIX.
      </p>

     
    </div>
  );
}

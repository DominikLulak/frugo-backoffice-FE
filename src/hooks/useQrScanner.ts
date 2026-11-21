import {useCallback, useEffect, useId, useRef, useState} from "react";
import {Html5Qrcode} from "html5-qrcode";

type UseQrScannerProps = {
    enabled: boolean;
    onScan: (value: string) => void;
}

export default function useQrScanner({
    enabled, onScan
}:UseQrScannerProps){
    const readerId = useId();
    const scannerRef = useRef<Html5Qrcode | null>(null)
    const scannedRef = useRef(false)
    const onScanRef = useRef(onScan)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        onScanRef.current = onScan
    }, [onScan]);

    const stopScanner = useCallback(async () => {
        const scanner = scannerRef.current

        if(!scanner){
            return
        }

        scannerRef.current = null

        try{
            if(scanner.isScanning){
                await scanner.stop()
            }

            scanner.clear()
        }catch (error){
            console.log("Failed to stop QR scanner:", error)
        }
    }, [])

    useEffect(() => {
        if(!enabled){
            return
        }

        let cancelled = false

        const scanner = new Html5Qrcode(readerId)

        scannerRef.current = scanner
        scannedRef.current = false

        const startScanner = async () => {
            setLoading(true)
            setError(null)

            try {
                await scanner.start(
                    {facingMode: "environment"},
                    {
                        fps: 10,
                        qrbox: {
                            width: 250,
                            height: 250
                        },
                        aspectRatio: 1
                    },
                    async (decodedText) => {
                        if(scannedRef.current || cancelled){
                            return
                        }

                        scannedRef.current = true

                        await stopScanner()
                        onScanRef.current(decodedText)
                    },
                    () => {

                    }
                )

                if(cancelled){
                    if(scanner.isScanning){
                        await scanner.stop()
                    }
                    scanner.clear()
                    return
                }

                setLoading(false)
            }catch (cameraError){
                console.log("Failed to initialize camera:", cameraError)

                if(!cancelled){
                    setError(
                        "Nepodarilo se spustit kameru. Zkontrolujte jeji opravneni"
                    )
                    setLoading(false)
                }
            }
        }

        void startScanner()

        return () => {
            cancelled = true;
            void stopScanner();
        }
    }, [enabled, readerId, stopScanner]);

    return{
        readerId, loading, error, stopScanner
    }
}
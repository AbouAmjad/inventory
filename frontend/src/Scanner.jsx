import { useState, useEffect, useRef } from 'react'
import { Html5Qrcode } from "html5-qrcode"
import { useNavigate } from 'react-router-dom'

export default function Scanner({ user }) {
  const [firstScan, setFirstScan] = useState(null)
  const [secondScan, setSecondScan] = useState(null)
  const [action, setAction] = useState('checkout')
  const [status, setStatus] = useState('ready')
  const [error, setError] = useState('')
  const scannerRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Store.aics.pro - Scanner'

    const html5QrCode = new Html5Qrcode(scannerRef.current.id)
    let scanning = false

    const startScanner = async () => {
      try {
        await html5QrCode.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          (decodedText) => {
            if (scanning) return
            scanning = true
            
            setTimeout(() => {
              handleScan(decodedText)
              scanning = false
            }, 500)
          },
          (errorMessage) => {
          }
        )
      } catch (err) {
        setError('Camera access denied. Please allow camera permissions.')
        setStatus('error')
      }
    }

    startScanner()

    return () => {
      if (html5QrCode.getState() !== Html5Qrcode.STATE.NOT_STARTED) {
        html5QrCode.stop().catch(err => console.log('Cleanup error:', err))
      }
    }
  }, [])

  const handleScan = (data) => {
    if (!data.includes(':')) {
      setError('Invalid QR code format')
      return
    }

    if (!firstScan) {
      setFirstScan(data)
      setStatus('awaiting_renter')
    } else if (!secondScan) {
      setSecondScan(data)
      setStatus('ready_to_confirm')
    }
  }

  const handleSubmit = async () => {
    try {
      setStatus('processing')
      setError('')
      
      const [itemPrefix, itemId] = firstScan.split(':')
      const [personPrefix, personId] = secondScan.split(':')
      
      if (itemPrefix !== 'ITEM' || personPrefix !== 'PERSON') {
        throw new Error('Invalid QR combination. Scan tool first, then person.')
      }

      const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
      const token = JSON.parse(localStorage.getItem('inventory_user')).email; // Simplified for demo
      
      const response = await fetch(`${API_BASE}/api/scan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          qrData: firstScan,
          action,
          renterId: personId
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Action failed')
      }

      const result = await response.json()
      alert(`✅ ${result.message}\n\nItem: ${itemId}\nRenter: ${personId}`)
      
      setFirstScan(null)
      setSecondScan(null)
      setStatus('ready')
    } catch (err) {
      setError(err.message)
      setStatus('error')
      setTimeout(() => setStatus('ready_to_confirm'), 3000)
    }
  }

  const resetScanner = () => {
    setFirstScan(null)
    setSecondScan(null)
    setStatus('ready')
    setError('')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Tool Scanner</h1>
        <p className="text-gray-600 mt-2">
          {status === 'ready' && 'Scan a tool QR code first, then scan a person QR code'}
          {status === 'awaiting_renter' && 'Now scan the renter\'s QR code'}
          {status === 'ready_to_confirm' && 'Confirm the action below'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
          <div 
            id="qr-scanner" 
            ref={scannerRef}
            className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300"
          >
            {error && (
              <div className="text-center text-red-500 p-4">
                <p className="font-medium">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Retry Camera Access
                </button>
              </div>
            )}
          </div>
          
          <div className="mt-4 space-y-3">
            {firstScan && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-medium text-gray-700">Tool scanned:</p>
                <p className="text-lg font-mono bg-gray-800 text-green-400 p-2 rounded mt-1 truncate">
                  {firstScan}
                </p>
              </div>
            )}
            
            {secondScan && (
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="font-medium text-gray-700">Person scanned:</p>
                <p className="text-lg font-mono bg-gray-800 text-yellow-300 p-2 rounded mt-1 truncate">
                  {secondScan}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Action Type
              </label>
              <select
                value={action}
                onChange={(e) => setAction(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={status !== 'ready_to_confirm'}
              >
                <option value="checkout">Check Out Tool</option>
                <option value="return">Return Tool</option>
              </select>
            </div>

            {status === 'ready_to_confirm' && (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-bold text-green-800">Ready to confirm</h3>
                  <p className="text-green-700 mt-1">
                    {action === 'checkout' ? 'Check out this tool to the scanned person' : 'Return this tool to inventory'}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleSubmit}
                    disabled={status === 'processing'}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                      status === 'processing' 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {status === 'processing' ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span>
{action === 'checkout' ? '✅ Confirm Checkout' : '↩️ Confirm Return'}
                      </span>
                    )}
                  </button>
                  
                  <button
                    onClick={resetScanner}
                    className="flex-1 py-3 px-4 rounded-lg font-medium bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors"
                  >
                    Reset Scanner
                  </button>
                </div>
              </div>
            )}

            {status === 'error' && error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-medium text-gray-700 mb-2">Quick Instructions</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Scan tool QR code first (starts with "ITEM:")</li>
                <li>Scan person QR code next (starts with "PERSON:")</li>
                <li>Select action type and confirm</li>
                <li>System will update inventory automatically</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

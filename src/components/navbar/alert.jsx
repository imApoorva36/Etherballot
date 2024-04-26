import { AlertCircle } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
 
export function AlertDestructive() {
  return (
    <div style={overlayStyle}>
    <div style={alertContainerStyle}>
    <Alert variant="destructive" style={alertStyle}>
      <AlertCircle className="h-6 w-5" style={{ color:'white'}} />
      <AlertTitle style={{ color: 'white', fontSize: '20px'}}>Metamask not installed</AlertTitle>
      <AlertDescription style={{ color: 'white', fontSize: '18px'}}>
        Kindly install Metamask extension before proceeding.
      </AlertDescription>
    </Alert>
    </div>
    </div>
  )
}
const overlayStyle = {
    display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backdropFilter: 'blur(2.5px)', 
  zIndex: 999, 
  };

  const alertStyle = {
    fill: '247 50% 5%',
    color: 'white',
  };
  const alertContainerStyle = {
    width: '500px', 
  };
  
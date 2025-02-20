import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { CheckCircle, XCircle, Info } from "lucide-react";

type TypeAlarm = "success" | "error" | "warn" | "info";
interface AlertProps {
    type: TypeAlarm
    message: string
    onDestroy?: ()=> void
}


function CustomAlert({ type, message }: AlertProps) {
    let icon;
    let backgroundColor;
    let borderColor;

    switch(type) {
      case "success":
        icon = <CheckCircle className="w-6 h-6" />;
        backgroundColor = "bg-green-600/5 text-green-500";
        borderColor = "border-green-400/70";
        break;
      case "error":
        icon = <XCircle className="w-6 h-6" />;
        backgroundColor = "bg-red-800/5 text-red-500";
        borderColor = "border-red-600/70";
        break;
      case "warn":
        icon = <Info className="w-6 h-6" />;
        backgroundColor = "bg-yellow-700/5 text-yellow-500";
        borderColor = "border-yellow-500/70";
        break;
      case "info":
        icon = <Info className="w-6 h-6" />;
        backgroundColor = "bg-blue-400/5 text-blue-300";
        borderColor = "border-blue-300/70";
        break;
    }
  

    return(
        <div className={`flex mb-2 items-center p-4 rounded-md shadow-md ${backgroundColor} border ${borderColor}`}>
            <div className="mr-3">
                { icon }
            </div>
            <div>
                <AlertTitle>
                    { type.toUpperCase() }
                </AlertTitle>
                <AlertDescription>
                    { message }
                </AlertDescription>
            </div>
        </div>
    );
}
function ManagerAlert({ type, message, onDestroy}: AlertProps) {
    const [visible, setVisible] = React.useState(false);

    React.useEffect(()=> {
        setTimeout(()=> setVisible(true), 600);

        setTimeout(()=> {
            setVisible(false);
            onDestroy();
        }, 4000);
    }, []);


    return (
        <div className={`
                transition-all duration-1000
                ${visible===true && "translate-x-0 translate-y-0 opacity-100"}
                ${visible===false && "translate-x-full -translate-y-full opacity-0"}
            `}
        >
            <CustomAlert 
                type={type} 
                message={message}
            />
        </div>
    );
}


export default function({ data }: {data: {type: TypeAlarm, text: string}}) {
    const [stack, setStack] = React.useState<React.JSX.Element[]>([]);

    const crate =(type: TypeAlarm, message: string)=> {
        setStack((old)=> {
            const key = old.length;

            return [
                ...old,
                <ManagerAlert 
                    key={key}
                    type={type} 
                    message={message}
                    onDestroy={()=> {
                        setTimeout(()=> setStack((olds)=> {
                            const findIndex = olds.findIndex((el)=> el.key === String(key))
                            
                            olds.splice(findIndex, 1);
                            return [...olds];
                        }), 600);
                    }}
                />
            ]
        });
    }
    React.useEffect(()=> {
        if(data) crate(data.type, data.text);
    }, [data]);
    

    return (
        <div className={`
                flex-col
                absolute top-4 right-4 z-50
                min-w-[200px] max-w-[330px]
            `}
        >
            { stack }
        </div>
    );
}
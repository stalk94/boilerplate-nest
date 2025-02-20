import React from 'react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./ui/hover-card";


// inline-flex
export default function({ body, children }) {
    return(
        <div className="p-4">
            <HoverCard>
                <HoverCardTrigger className="inline-block">
                    { children }
                </HoverCardTrigger>
                <HoverCardContent className="absolute left-0 mt-2 bg-gray-900/50 border rounded-lg shadow-lg">
                    { body }
                </HoverCardContent>
            </HoverCard>
        </div>
    );
}
import React, { useRef, useState, useEffect, ComponentProps } from 'react';
import { DataTable, DataTableValueArray } from "primereact/datatable";


type DataTablePropsWrapper = ComponentProps<typeof DataTable>;


// обертка над DataTable primereact с корректным расчетом ширины контейнера
export default function({ value, children, header, footer, ...props }: DataTablePropsWrapper) {
    const tableRef = useRef<DataTable<DataTableValueArray>>(null);
    const [scrollHeight, setScrollHeight] = useState<string>();
    const [height, setHeight] = useState<number>();

    
    const getPadding =(element: Element)=> {
        const style = getComputedStyle(element);
        const padding = parseFloat(style.paddingBottom);

        return padding;
    }
    const getBound =(element: Element)=> {
        const parent = element.parentElement;     // родитель
        const bound = element.getBoundingClientRect();
        const boundParent = parent.getBoundingClientRect();
        
        const maxHeight = window.innerHeight - bound.y;
        const padding = getPadding(parent) * 2;
        //console.log(window.innerHeight, boundParent.height)

        if(window.innerHeight <= boundParent.height) {
            parent.style.height = maxHeight + 'px';
            
            return maxHeight - padding;
        }
        else {
            return boundParent.height - padding;
        }
    }
    useEffect(()=> {
        const updateHeight =()=> {
            if(tableRef.current) {
                const container = tableRef.current.getElement();
                const bodyArea = tableRef.current.getTable().parentElement;
                const parent = container.parentElement;     // родитель
                
                const headerElement = container.querySelector('.p-datatable-header');
                const footerElement = container.querySelector('.p-datatable-footer');

                //const parentHeight = parent.offsetHeight || 0;
                const containerHeight = container?.offsetHeight || 0;
                const headerHeight = headerElement?.offsetHeight || 0;
                const footerHeight = footerElement?.offsetHeight || 0;
                //console.log(parentHeight);

                // Вычисляем высоту прокручиваемой области
                const calculatedScrollHeight = containerHeight - headerHeight - footerHeight;
                
                setScrollHeight(`${Math.max(calculatedScrollHeight, 50)}px`);
                //console.log(getBound(container))
                setHeight(getBound(container));
            }
        };

        const resizeObserver = new ResizeObserver(updateHeight);
        if(tableRef.current) {
            const container = tableRef.current?.getElement();
            resizeObserver.observe(container);
        }

        return ()=> {
            resizeObserver.disconnect();
        }
    }, [header, footer, value]);

    
    return (
        <div style={{height:'100%', padding:'1px'}}>
            <DataTable
                ref={tableRef}
                value={value}
                scrollable={true}
                scrollHeight={scrollHeight}
                style={{maxHeight: `${height}px`}}
                header={header}
                footer={footer}
                {...props}
            >
                { children }
            </DataTable>
        </div>
    );
}
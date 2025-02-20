import React from 'react';
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { Collapsible, CollapsibleTrigger, CollapsibleContent  } from "./ui/collapsible";
import { Calendar, Home, Inbox, Search, Settings, ChevronDown } from "lucide-react";
import { 
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarHeader
} from "./ui/sidebar";
import "./style.css";

type SchemaGroup = {
    type: 'base' | 'collapse' | undefined
    label: string | React.JSX.Element
    items: Array<{
        title: string | React.JSX.Element
        comand: Function
        icon: SVGSVGElement | React.JSX.Element
    }>
}
type PropsSideBar = {
    open: boolean
    schema: SchemaGroup[]
    footer: string | React.JSX.Element | undefined
    header: string | React.JSX.Element | undefined
    isCollapsed: boolean
}


const BaseGroop =({ label, children })=> {
    return(
        <SidebarGroup>
            <SidebarGroupLabel>
                { label }
            </SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    { children }
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
const CollapseGroup =({ label, defaultOpen, children })=> {
    return(
        <Collapsible defaultOpen={defaultOpen} className="group/collapsible">
            <SidebarGroup>
                <SidebarGroupLabel asChild>
                    <CollapsibleTrigger>
                        { label }
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                    <SidebarGroupContent>
                        { children }
                    </SidebarGroupContent>
                </CollapsibleContent>
            </SidebarGroup>
        </Collapsible>
    );
}
const GroopMain =({ items, isColapsed })=> {
    return(
        <SidebarMenu>
            { items.map((item, index)=> (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild size="lg">
                        <div style={{color:'white'}} onClick={item.comand}>
                            { item.icon }
                            { !isColapsed &&
                                <span>
                                    { item.title }
                                </span>
                            }
                        </div>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
}



export default function({ open, schema, footer, header, isCollapsed }: PropsSideBar) {

    return(
        <SidebarProvider open={open} 
            style={{
                "--sidebar-width": isCollapsed ? "5rem" : "20rem",
                "--sidebar-width-mobile": isCollapsed ? "5rem" : "20rem",
            }}
        >
            <Sidebar collapsible='icon'>
                { header && 
                    <SidebarHeader className='SidebarHeader'>
                        { header }
                    </SidebarHeader>
                }
                <SidebarContent className='SidebarContent'>
                    { schema && schema.map((group, index)=> {
                        if(group.type !== 'base') return(
                            <CollapseGroup key={index} label={group.label} defaultOpen={true}>
                                <GroopMain items={group.items} isColapsed={isCollapsed}/>
                            </CollapseGroup>
                        );
                        else return(
                            <BaseGroop key={index} label={group.label}>
                                <GroopMain items={group.items} isColapsed={isCollapsed}/>
                            </BaseGroop>
                        );
                    })}
                </SidebarContent>
                { footer &&
                    <SidebarFooter className='SidebarFooter'>
                        { footer }
                    </SidebarFooter>
                }
            </Sidebar>
      </SidebarProvider>
    );
  }
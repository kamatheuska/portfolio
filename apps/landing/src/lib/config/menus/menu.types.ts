export interface NavigationRoute {
    href: string;
    label: string;
    name?: string;
    isExternal?: boolean;
    children?: NavigationRoute[];
}

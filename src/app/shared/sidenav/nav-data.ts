import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
  {
    routeLink: 'dashboard',
    icon: 'fal fa-dashboard',
    label: 'Dashboard'
  },
  {
    routeLink: 'tenant',
    icon: 'fal fa-home',
    label: 'Manage Tenant'
  },
  // {
  //   routeLink: 'branches',
  //   icon: 'fal fa-home',
  //   label: 'Manage Branches'
  // },
  {
    routeLink: 'settings',
    icon: 'fal fa-cog',
    label: 'Settings',
    expanded: true,
    items: [
      {
        routeLink: 'settings/working-hours',
        label: 'Working hours'
      },
      {
        routeLink: 'settings/profile',
        label: 'Profile'
      },
      {
        routeLink: 'login',
        label: 'logout'
      }
    ]
  },
];

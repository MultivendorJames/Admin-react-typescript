import { lazy } from 'react';
const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Content-management/FormElements'));
const FormLayout = lazy(() => import('../pages/Content-management/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const Traffic = lazy(()=> import('../pages/Traffic'))
const Users = lazy(()=> import('../pages/User-management'))
const Payout = lazy(()=> import('../pages/Payout-management'))

const coreRoutes = [
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/content-management/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/content-management/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
   {
    path: 'traffic',
    title: 'Traffic',
    component: Traffic,
  },
    {
    path: 'user-management',
    title: 'Users',
    component: Users,
  },
  {
    path: 'payout-management',
    title: 'Payout',
    component: Payout,
  },
];

const routes = [ ...coreRoutes];

console.log(routes);

export default routes;

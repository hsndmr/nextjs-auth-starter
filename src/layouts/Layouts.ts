import Layout from '@/layouts/Layout/Layout';
import DashboardLayout from '@/layouts/DashboardLayout/DashboardLayout';

export const Layouts = {
  Default: Layout,
  Dashboard: DashboardLayout,
};

export type LayoutKeys = keyof typeof Layouts;

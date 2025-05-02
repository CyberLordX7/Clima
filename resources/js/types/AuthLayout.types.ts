import { ReactNode } from "react";

export type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  caption: string;
};
export type ListItem = {
    id: string;
    name: string;
    description?: string;
    accessRevoke?: string;
    icon?: ReactNode;
    iconTwo?: ReactNode;
    iconThree?: ReactNode;
    action?: VoidFunction;
    image?: string;
    component?(): ReactNode;
  };


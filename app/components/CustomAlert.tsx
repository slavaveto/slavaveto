import React from "react";
import { Alert } from "@nextui-org/react";
import classNames from "classnames";

// Интерфейс для пропсов
interface CustomAlertProps {
    color?: "danger" | "default" | "primary" | "secondary" | "success" | "warning";
    showIcon?: boolean;
    title: string;
    description: string;
    children?: React.ReactNode;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
                                                     color = "danger",
                                                     showIcon = true,
                                                     title,
                                                     description,
                                                     children,
                                                 }) => {
    return (
        <Alert
            classNames={{
                base: classNames(
                    "bg-default-50 dark:bg-background shadow-sm",
                    "relative before:content-[''] before:absolute before:z-10",
                    "before:left-0 before:top-[-1px] before:bottom-[-1px] before:w-1",
                    "rounded-l-none border-l-0",
                    `before:bg-${color}`,
                    "border", // Добавляем общий бордер
                    "border-default-200 dark:border-[2px] dark:border-default ", // Ярче бордер в темном режиме
                    "border-l-0 dark:border-l-0",
                ),
                mainWrapper: "pt-[8px] text-medium pb-[8px]",
                iconWrapper: showIcon ? "dark:bg-transparent" : "hidden",
                description: "pt-[20px]",
            }}
            color={color}
            title={title}
            description={description}
            variant="faded"
        >
            {children}
        </Alert>
    );
};

export default CustomAlert;
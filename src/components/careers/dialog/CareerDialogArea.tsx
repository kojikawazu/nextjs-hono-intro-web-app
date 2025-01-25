import React from 'react';
// features
import { useDialogLogic } from '@/features/dialog/useDialogLogic';
// shared
import { componentStart, componentJSX } from '@/shared/utils/logUtilities';
// components
import CareerDialogLayout from '@/components/careers/dialog/CareerDialogLayout';
import CareerDetailDialog from '@/components/careers/dialog/CareerDetailDialog';

/**
 * Dialogエリアコンポーネント
 * @returns JSX
 */
const CareerDialogArea = () => {
    componentStart(CareerDialogArea);

    // hook
    const { isDialogOpen, dialogIndex, setCloseDialog } = useDialogLogic();

    componentJSX(CareerDialogArea);
    return (
        <CareerDialogLayout show={isDialogOpen} onClose={() => setCloseDialog()}>
            <CareerDetailDialog currentIndex={dialogIndex} />
        </CareerDialogLayout>
    );
};

export default CareerDialogArea;

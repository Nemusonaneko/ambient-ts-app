import EditHeader from '../../../components/Trade/Edit/EditHeader/EditHeader';
import styles from './Edit.module.css';
import { useParams } from 'react-router-dom';
import CurrencyDisplayContainer from '../../../components/Trade/Edit/CurrencyDisplayContainer/CurrencyDisplayContainer';
import MinMaxPrice from '../../../components/Trade/Range/AdvancedModeComponents/MinMaxPrice/MinMaxPrice';
import EditPriceInfo from '../../../components/Trade/Edit/EditPriceInfo/EditPriceInfo';
import EditButton from '../../../components/Trade/Edit/EditButton/EditButton';
import Divider from '../../../components/Global/Divider/Divider';
import Modal from '../../../components/Global/Modal/Modal';
import ConfirmEditModal from '../../../components/Trade/Edit/ConfirmEditModal/ConfirmEditModal';
import { useModal } from '../../../components/Global/Modal/useModal';
import { useState, useEffect } from 'react';
// interface EditProps {
//     children: React.ReactNode;
// }

export default function Edit() {
    const [isModalOpen, openModal, closeModal] = useModal();

    const minPricePercentage = -15;
    const maxPricePercentage = 15;

    const isDenomBase = false;

    const [minPriceInputString, setMinPriceInputString] = useState<string>('');
    const [maxPriceInputString, setMaxPriceInputString] = useState<string>('');

    const [rangeLowBoundFieldBlurred, setRangeLowBoundFieldBlurred] = useState(true);

    const lowBoundOnBlur = () => setRangeLowBoundFieldBlurred(true);

    const rangeLowBoundDisplayPrice = 1;
    const rangeHighBoundDisplayPrice = 1;

    const [rangeHighBoundFieldBlurred, setRangeHighBoundFieldBlurred] = useState(true);
    const highBoundOnBlur = () => setRangeHighBoundFieldBlurred(true);

    useEffect(() => {
        console.log('low bound blurred');
        if (rangeLowBoundFieldBlurred) {
            const rangeLowBoundDisplayField = document.getElementById(
                'min-price-input-quantity',
            ) as HTMLInputElement;
            if (rangeLowBoundDisplayField) {
                rangeLowBoundDisplayField.value = rangeLowBoundDisplayPrice.toString();
            }
            setRangeLowBoundFieldBlurred(false);
        }
    }, [rangeLowBoundDisplayPrice, rangeLowBoundFieldBlurred]);

    useEffect(() => {
        console.log('high bound blurred');
        if (rangeHighBoundFieldBlurred) {
            const rangeHighBoundDisplayField = document.getElementById(
                'max-price-input-quantity',
            ) as HTMLInputElement;
            if (rangeHighBoundDisplayField) {
                rangeHighBoundDisplayField.value = rangeHighBoundDisplayPrice.toString();
            }
            setRangeHighBoundFieldBlurred(false);
        }
    }, [rangeHighBoundDisplayPrice, rangeHighBoundFieldBlurred]);

    const { positionHash } = useParams();
    console.log(positionHash);

    const confirmEditModal = isModalOpen ? (
        <Modal onClose={closeModal} title='Edit Position'>
            <ConfirmEditModal onClose={closeModal} />
        </Modal>
    ) : null;
    return (
        <div className={styles.editContainer}>
            <EditHeader positionHash={positionHash} />
            <div className={styles.edit_content}>
                <CurrencyDisplayContainer />
                <Divider />
                <MinMaxPrice
                    minPricePercentage={minPricePercentage}
                    maxPricePercentage={maxPricePercentage}
                    minPriceInputString={minPriceInputString}
                    maxPriceInputString={maxPriceInputString}
                    setMinPriceInputString={setMinPriceInputString}
                    setMaxPriceInputString={setMaxPriceInputString}
                    isDenomBase={isDenomBase}
                    // highBoundOnFocus={highBoundOnFocus}
                    highBoundOnBlur={highBoundOnBlur}
                    lowBoundOnBlur={lowBoundOnBlur}
                />
                <EditPriceInfo />
                <EditButton onClickFn={openModal} />
            </div>
            {confirmEditModal}
        </div>
    );
}

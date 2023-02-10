// START: Import React and Dongles
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { tickToPrice, toDisplayPrice } from '@crocswap-libs/sdk';

// START: Import JSX Components
import RepositionButton from '../../../components/Trade/Reposition/Repositionbutton/RepositionButton';
import RepositionDenominationSwitch from '../../../components/Trade/Reposition/RepositionDenominationSwitch/RepositionDenominationSwitch';
import RepositionHeader from '../../../components/Trade/Reposition/RepositionHeader/RepositionHeader';
import RepositionPriceInfo from '../../../components/Trade/Reposition/RepositionPriceInfo/RepositionPriceInfo';
import RepositionRangeWidth from '../../../components/Trade/Reposition/RepositionRangeWidth/RepositionRangeWidth';
import ConfirmRepositionModal from '../../../components/Trade/Reposition/ConfirmRepositionModal/ConfirmRepositionModal';
import Modal from '../../../components/Global/Modal/Modal';

// START: Import Other Local Files
import styles from './Reposition.module.css';
import { useModal } from '../../../components/Global/Modal/useModal';
import { useAppSelector } from '../../../utils/hooks/reduxToolkit';
import { PositionIF, SlippagePairIF } from '../../../utils/interfaces/exports';

interface propsIF {
    isDenomBase: boolean;
    ambientApy: number | undefined;
    repoSlippage: SlippagePairIF;
    isPairStable: boolean;
    bypassConfirm: boolean;
    toggleBypassConfirm: (item: string, pref: boolean) => void;
}

export default function Reposition(props: propsIF) {
    const {
        isDenomBase,
        ambientApy,
        repoSlippage,
        isPairStable,
        bypassConfirm,
        toggleBypassConfirm
    } = props;

    // current URL parameter string
    const { params } = useParams();

    // location object (we need this mainly for position data)
    const location = useLocation();

    // fn to conditionally navigate the user
    const navigate = useNavigate();

    // redirect path to use in this module
    // will try to preserve current params, will use default path otherwise
    const redirectPath = '/trade/range/' + (params ?? '');

    // log in console if conditions are such to trigger an automatic URL redirect
    // this will help troubleshoot if we ever break functionality to link this page
    console.assert(
        location.state,
        `Component Reposition() did not receive position data on load. Expected to receive a data object conforming to the shape of PositionIF in location.state as returned by the useLocation() hook. Actual value received is <<${location.state}>>. App will redirect to a page with generic functionality. Refer to Reposition.tsx for troubleshooting. This is expected behavior should a user navigate to the '/trade/reposition/:params' pathway any other way than clicking an in-app <Link/> element.`,
    );

    // navigate the user to the redirect URL path if location.state has no data
    // ... this value will be truthy if the user arrived here by clicking a link
    // ... inside the app, but will be empty if they navigated manually to the path
    location.state || navigate(redirectPath, { replace: true });

    // position data from the location object
    const { position } = location.state;
    const tradeData = useAppSelector((state) => state.tradeData);

    const simpleRangeWidth = tradeData.simpleRangeWidth;

    const currentPoolPriceTick = position.poolPriceInTicks || 0;
    const baseTokenDecimals = position.baseDecimals || 18;
    const quoteTokenDecimals = position.quoteDecimals || 18;

    const currentPoolPriceNonDisplay = tickToPrice(currentPoolPriceTick);

    const currentPoolDisplayPriceInBase =
        1 / toDisplayPrice(currentPoolPriceNonDisplay, baseTokenDecimals, quoteTokenDecimals);

    const currentPoolDisplayPriceInQuote = toDisplayPrice(
        currentPoolPriceNonDisplay,
        baseTokenDecimals,
        quoteTokenDecimals,
    );

    const truncatedCurrentPoolDisplayPriceInBase = currentPoolDisplayPriceInBase
        ? currentPoolDisplayPriceInBase < 2
            ? currentPoolDisplayPriceInBase.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 6,
              })
            : currentPoolDisplayPriceInBase.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
              })
        : '0.00';

    const truncatedCurrentPoolDisplayPriceInQuote = currentPoolDisplayPriceInQuote
        ? currentPoolDisplayPriceInQuote < 2
            ? currentPoolDisplayPriceInQuote.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 6,
              })
            : currentPoolDisplayPriceInQuote.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
              })
        : '0.00';

    const currentPoolPriceDisplay =
        currentPoolPriceNonDisplay === 0
            ? '0'
            : isDenomBase
            ? truncatedCurrentPoolDisplayPriceInBase
            : truncatedCurrentPoolDisplayPriceInQuote;

    // const currentLocation = location.pathname;
    const [isModalOpen, openModal, closeModal] = useModal();

    useEffect(() => {
        setRangeWidthPercentage(() => simpleRangeWidth);
    }, [simpleRangeWidth]);

    const sendRepositionTransaction = () => {
        console.log({ position });
    };

    const [rangeWidthPercentage, setRangeWidthPercentage] = useState(10);

    return (
        <div className={styles.repositionContainer}>
            <RepositionHeader
                positionHash={position.positionStorageSlot}
                redirectPath={redirectPath}
                repoSlippage={repoSlippage}
                isPairStable={isPairStable}
                bypassConfirm={bypassConfirm}
                toggleBypassConfirm={toggleBypassConfirm}
            />
            <div className={styles.reposition_content}>
                <RepositionRangeWidth
                    rangeWidthPercentage={rangeWidthPercentage}
                    setRangeWidthPercentage={setRangeWidthPercentage}
                />
                <RepositionDenominationSwitch
                    baseTokenSymbol={position.baseSymbol || 'ETH'}
                    quoteTokenSymbol={position.quoteSymbol || 'USDC'}
                />
                <RepositionPriceInfo
                    position={position}
                    ambientApy={ambientApy}
                    currentPoolPriceDisplay={currentPoolPriceDisplay}
                    currentPoolPriceTick={currentPoolPriceTick}
                    rangeWidthPercentage={rangeWidthPercentage}
                />
                <RepositionButton
                    bypassConfirm={bypassConfirm}
                    onClickFn={openModal}
                />
            </div>
            {isModalOpen && (
                <Modal onClose={closeModal} title=' Confirm Reposition'>
                    <ConfirmRepositionModal
                        position={position as PositionIF}
                        ambientApy={ambientApy}
                        currentPoolPriceDisplay={currentPoolPriceDisplay}
                        currentPoolPriceTick={currentPoolPriceTick}
                        rangeWidthPercentage={rangeWidthPercentage}
                        onClose={closeModal}
                        onSend={sendRepositionTransaction}
                    />
                </Modal>
            )}
        </div>
    );
}

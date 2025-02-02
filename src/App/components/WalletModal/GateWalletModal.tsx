// START: Import React and Dongles
import { useContext } from 'react';

// START: Import Local Files
import styles from './GateWalletModal.module.css';
import Modal from '../../../components/Global/Modal/Modal';
import Button from '../../../components/Form/Button';

import { useTermsAgreed } from '../../hooks/useTermsAgreed';
import { AppStateContext } from '../../../contexts/AppStateContext';
import { useWeb3Modal } from '@web3modal/ethers5/react';
import { CircleLoaderFailed } from '../../../components/Global/LoadingAnimations/CircleLoader/CircleLoader';
import { VIEW_ONLY } from '../../../ambient-utils/constants';

export default function GateWalletModal() {
    const {
        walletModal: { close: closeModal },
    } = useContext(AppStateContext);

    const walletConnectionsAllowed = !VIEW_ONLY;
    const [recordAgreed, __, termUrls] = useTermsAgreed();
    const { open: openW3Modal } = useWeb3Modal();

    return walletConnectionsAllowed ? (
        <Modal onClose={closeModal} title='Welcome'>
            <div className={styles.main_container}>
                <section className={styles.first_section}>
                    <p>
                        This website is a public{' '}
                        <a
                            href={termUrls.openSource}
                            target='_blank'
                            rel='noreferrer'
                            aria-label='open source repo'
                        >
                            open source web application
                        </a>{' '}
                        to access the blockchain-based Ambient protocol.
                    </p>
                    <p>
                        By clicking Agree, you accept the{' '}
                        <a
                            href={`${window.location.origin}/${termUrls.tos}`}
                            target='_blank'
                            rel='noreferrer'
                            aria-label='terms of service'
                        >
                            Terms of Service
                        </a>
                        .
                    </p>
                    <p>
                        Site Privacy Policy can be{' '}
                        <a
                            href={`${window.location.origin}/${termUrls.privacy}`}
                            target='_blank'
                            rel='noreferrer'
                            aria-label='site policy'
                        >
                            found here
                        </a>
                        .
                    </p>
                </section>
                <section>
                    <Button
                        idForDOM='agree_button_ToS'
                        flat
                        title='Agree'
                        action={() => {
                            recordAgreed();
                            closeModal();
                            openW3Modal();
                        }}
                    />
                </section>
            </div>
        </Modal>
    ) : (
        <Modal onClose={closeModal} title='Not Available'>
            <div className={styles.not_available_container}>
                <CircleLoaderFailed size='48' />
                <p>Ambient is not available in the United States.</p>
                <p>If you think this is an error, contact the host.</p>
                <Button
                    idForDOM='acknowledge_ambient_not_available_in_US_button'
                    flat
                    title='Close'
                    action={() => {
                        closeModal();
                    }}
                />
            </div>
        </Modal>
    );
}

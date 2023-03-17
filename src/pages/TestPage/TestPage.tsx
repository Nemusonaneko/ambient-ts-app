import styles from './TestPage.module.css';
import 'intro.js/introjs.css';
import { tosMethodsIF } from '../../App/hooks/useTermsOfService';
import { chartSettingsMethodsIF } from '../../App/hooks/useChartSettings';
import { allSkipConfirmMethodsIF } from '../../App/hooks/useSkipConfirm';

interface TestPageProps {
    openGlobalModal: (content: React.ReactNode, title?: string) => void;
    openSidebar: () => void;
    closeSidebar: () => void;
    togggggggleSidebar: () => void;
    walletToS: tosMethodsIF;
    chartSettings: chartSettingsMethodsIF;
    bypassConf: allSkipConfirmMethodsIF;
}
// eslint-disable-next-line
export default function TestPage(props: TestPageProps) {
    const { bypassConf } = props;

    return (
        <section className={styles.main}>
            <p>
                Confirmation for swap is:{' '}
                {JSON.stringify(bypassConf.range.isEnabled)}
            </p>
            <button onClick={() => bypassConf.range.enable()}>
                Turn it on!
            </button>
            <button onClick={() => bypassConf.range.disable()}>
                Turn it off!
            </button>
        </section>
    );
}

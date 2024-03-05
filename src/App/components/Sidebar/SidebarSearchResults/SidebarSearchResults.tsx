import PoolsSearchResults from './PoolsSearchResults/PoolsSearchResults';
import PositionsSearchResults from './PositionsSearchResults';
import OrdersSearchResults from './OrdersSearchResults';
import TxSearchResults from './TxSearchResults/TxSearchResults';
import { PoolStatsFn } from '../../../../ambient-utils/dataLayer';
import { TokenPriceFn } from '../../../../ambient-utils/api';
import { sidebarSearchIF } from '../../../hooks/useSidebarSearch';
import { SearchResultsContainer } from '../../../../styled/Components/Sidebar';
import { Text } from '../../../../styled/Common';
import { useContext } from 'react';
import { UserDataContext } from '../../../../contexts/UserDataContext';
import WalletSearchResults from './WalletSearchResults';

interface propsIF {
    cachedPoolStatsFetch: PoolStatsFn;
    cachedFetchTokenPrice: TokenPriceFn;
    searchData: sidebarSearchIF;
}

export default function SidebarSearchResults(props: propsIF) {
    const { searchData, cachedPoolStatsFetch, cachedFetchTokenPrice } = props;
    const { isUserConnected } = useContext(UserDataContext);

    // value for control flow to determine what data to show in search results
    const displaySet: 'token' | 'wallet' = searchData.wallets.length
        ? 'wallet'
        : 'token';

    return (
        <SearchResultsContainer
            flexDirection='column'
            fullHeight
            fullWidth
            margin='8px 8px 0 8px'
            padding='8px'
            background='dark2'
            gap={8}
        >
            <Text fontSize='header2' color='accent5'>
                Search Results
            </Text>
            {displaySet === 'token' && (
                <>
                    <PoolsSearchResults
                        searchedPools={searchData.pools}
                        cachedPoolStatsFetch={cachedPoolStatsFetch}
                        cachedFetchTokenPrice={cachedFetchTokenPrice}
                    />
                    {isUserConnected && (
                        <>
                            <TxSearchResults searchedTxs={searchData.txs} />
                            <OrdersSearchResults
                                searchedLimitOrders={searchData.limits}
                            />
                            <PositionsSearchResults
                                searchedPositions={searchData.positions}
                            />
                        </>
                    )}
                </>
            )}
            {displaySet === 'wallet' && (
                <WalletSearchResults searchedWallets={searchData.wallets} />
            )}
        </SearchResultsContainer>
    );
}
